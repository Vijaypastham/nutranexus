import express from 'express';
import { z } from 'zod';
import { dbQuery, dbGet, dbAll } from '../database/init';
import { logger } from '../utils/logger';
import { createError } from '../middleware/errorHandler';

const jwt = require('jsonwebtoken');
const Stripe = require('stripe');

const router: express.Router = express.Router();

// Fixed merchant credentials
const MERCHANT_CREDENTIALS = {
  username: process.env.MERCHANT_USERNAME || 'admin',
  password: process.env.MERCHANT_PASSWORD || 'merchant123'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

// Validation schemas
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  trackingNumber: z.string().optional(),
});

const refundSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  amount: z.number().positive().optional(), // If not provided, full refund
  reason: z.string().optional(),
});

// Middleware to verify JWT token
const verifyMerchantToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required' 
    });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.merchant = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    });
  }
};

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Merchant API is working',
    timestamp: new Date().toISOString()
  });
});

// Merchant login endpoint
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    // Verify credentials
    if (username !== MERCHANT_CREDENTIALS.username || password !== MERCHANT_CREDENTIALS.password) {
      throw createError('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username, 
        role: 'merchant',
        loginTime: new Date().toISOString()
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info('Merchant login successful', { username });

    res.json({
      success: true,
      data: {
        token,
        expiresIn: '24h',
        merchant: { username, role: 'merchant' }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get all orders with pagination
router.get('/orders', verifyMerchantToken, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        order_number, customer_name, customer_email, customer_phone,
        items, total_amount, currency, status, stripe_payment_intent_id,
        receipt_url, created_at, updated_at
      FROM orders
    `;
    const params: any[] = [];

    if (status) {
      query += ` WHERE status = $1`;
      params.push(status);
      query += ` ORDER BY created_at DESC LIMIT $2 OFFSET $3`;
      params.push(limit, offset);
    } else {
      query += ` ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
      params.push(limit, offset);
    }

    const orders = await dbAll(query, params);

    // Parse items JSON for each order
    const processedOrders = orders.map(order => ({
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
    }));

    res.json({
      success: true,
      data: {
        orders: processedOrders,
        pagination: {
          page,
          limit,
          hasMore: orders.length === limit
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update order status
router.put('/orders/:orderNumber/status', verifyMerchantToken, async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const { status, trackingNumber } = updateOrderStatusSchema.parse(req.body);

    // Check if order exists
    const existingOrder = await dbGet(`
      SELECT order_number, status as current_status 
      FROM orders 
      WHERE order_number = $1
    `, [orderNumber]);

    if (!existingOrder) {
      throw createError('Order not found', 404);
    }

    // Update order status
    let updateQuery = `
      UPDATE orders 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
    `;
    const params = [status];

    if (trackingNumber) {
      updateQuery += `, tracking_number = $${params.length + 1}`;
      params.push(trackingNumber);
    }

    updateQuery += ` WHERE order_number = $${params.length + 1}`;
    params.push(orderNumber);

    await dbQuery(updateQuery, params);

    logger.info('Order status updated', {
      orderNumber,
      oldStatus: existingOrder.current_status,
      newStatus: status,
      trackingNumber,
              updatedBy: (req as any).merchant.username
    });

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        orderNumber,
        status,
        trackingNumber
      }
    });
  } catch (error) {
    next(error);
  }
});

// Initiate refund
router.post('/orders/:orderNumber/refund', verifyMerchantToken, async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const { amount, reason } = refundSchema.parse(req.body);

    // Get order details
    const order = await dbGet(`
      SELECT 
        order_number, total_amount, currency, status, 
        stripe_payment_intent_id, customer_email
      FROM orders 
      WHERE order_number = $1
    `, [orderNumber]);

    if (!order) {
      throw createError('Order not found', 404);
    }

    if (!order.stripe_payment_intent_id) {
      throw createError('No payment found for this order', 400);
    }

    if (order.status === 'cancelled') {
      throw createError('Order is already cancelled', 400);
    }

    // Calculate refund amount
    const refundAmount = amount ? Math.round(amount * 100) : Math.round(parseFloat(order.total_amount) * 100);

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: order.stripe_payment_intent_id,
      amount: refundAmount,
      reason: 'requested_by_customer',
      metadata: {
        orderNumber,
        refundReason: reason || 'Merchant initiated refund',
        processedBy: (req as any).merchant.username
      }
    });

    // Update order status to cancelled
    await dbQuery(`
      UPDATE orders 
      SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
      WHERE order_number = $1
    `, [orderNumber]);

    logger.info('Refund processed', {
      orderNumber,
      refundId: refund.id,
      amount: refundAmount / 100,
      currency: order.currency,
      reason: reason || 'Merchant initiated refund',
      processedBy: (req as any).merchant.username
    });

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        orderNumber,
        refundId: refund.id,
        amount: refundAmount / 100,
        currency: order.currency,
        status: refund.status
      }
    });
  } catch (error) {
    if (error.type === 'StripeError') {
      return next(createError(`Stripe error: ${error.message}`, 400));
    }
    next(error);
  }
});

// Get refunds with pagination and filtering
router.get('/refunds', verifyMerchantToken, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    // For now, we'll use a mock table for refunds since we don't have a separate refunds table
    // In a real application, you would create a refunds table to store refund history
    // This mock data simulates what would be stored in a refunds table
    const mockRefunds = [
      {
        id: '1',
        order_number: 'NN905498290',
        customer_name: 'Test Customer',
        customer_email: 'test@example.com',
        refund_amount: 1699,
        original_amount: 1699,
        currency: 'INR',
        status: 'succeeded',
        reason: 'Customer requested cancellation',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        stripe_refund_id: 're_1234567890'
      },
      {
        id: '2',
        order_number: 'NN511354772',
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        refund_amount: 3499,
        original_amount: 6998,
        currency: 'INR',
        status: 'pending',
        reason: 'Partial refund - damaged item',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        stripe_refund_id: 're_0987654321'
      },
      {
        id: '3',
        order_number: 'NN330412639',
        customer_name: 'Test User',
        customer_email: 'testuser@example.com',
        refund_amount: 2998,
        original_amount: 2998,
        currency: 'INR',
        status: 'succeeded',
        reason: 'Order processing error',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        stripe_refund_id: 're_1122334455'
      }
    ];

    // Filter by status if provided
    let filteredRefunds = mockRefunds;
    if (status && status !== 'all') {
      filteredRefunds = mockRefunds.filter((refund: any) => refund.status === status);
    }

    // Apply pagination
    const paginatedRefunds = filteredRefunds.slice(offset, offset + limit);

    res.json({
      success: true,
      data: {
        refunds: paginatedRefunds,
        pagination: {
          page,
          limit,
          total: filteredRefunds.length,
          hasMore: offset + limit < filteredRefunds.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get enhanced analytics data
router.get('/analytics', verifyMerchantToken, async (req, res, next) => {
  try {
    const dateRange = req.query.dateRange as string || '7days';
    
    // Calculate date range
    let daysBack = 7;
    switch (dateRange) {
      case '30days': daysBack = 30; break;
      case '90days': daysBack = 90; break;
      case '1year': daysBack = 365; break;
      default: daysBack = 7;
    }

    const currentPeriodStart = new Date();
    currentPeriodStart.setDate(currentPeriodStart.getDate() - daysBack);
    
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - (daysBack * 2));
    const previousPeriodEnd = new Date(currentPeriodStart);

    // Get current period stats
    const currentStats = await dbGet(`
      SELECT 
        COUNT(*) as order_count,
        SUM(CAST(total_amount AS DECIMAL)) as revenue,
        AVG(CAST(total_amount AS DECIMAL)) as avg_order_value
      FROM orders 
      WHERE created_at >= $1
    `, [currentPeriodStart.toISOString()]);

    // Get previous period stats for comparison
    const previousStats = await dbGet(`
      SELECT 
        COUNT(*) as order_count,
        SUM(CAST(total_amount AS DECIMAL)) as revenue,
        AVG(CAST(total_amount AS DECIMAL)) as avg_order_value
      FROM orders 
      WHERE created_at >= $1 AND created_at < $2
    `, [previousPeriodStart.toISOString(), previousPeriodEnd.toISOString()]);

    // Get daily revenue for charts
    const dailyRevenue = await dbAll(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders,
        SUM(CAST(total_amount AS DECIMAL)) as revenue
      FROM orders 
      WHERE created_at >= $1
      GROUP BY DATE(created_at)
      ORDER BY date
    `, [currentPeriodStart.toISOString()]);

    // Get orders by status
    const ordersByStatus = await dbAll(`
      SELECT 
        status,
        COUNT(*) as count,
        (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders WHERE created_at >= $1)) as percentage
      FROM orders 
      WHERE created_at >= $1
      GROUP BY status
    `, [currentPeriodStart.toISOString()]);

    // Get top products (mock data for now since we don't have detailed product analytics)
    const topProducts = [
      { name: 'Unflavored Nutripro+', sales: 28, revenue: 41972, percentage: 33.6 },
      { name: 'Chocolate Dryfruit Fusion', sales: 15, revenue: 25485, percentage: 20.4 },
      { name: 'Strawberry Protein+', sales: 12, revenue: 19188, percentage: 15.4 },
      { name: 'Vanilla Deluxe', sales: 8, revenue: 12392, percentage: 9.9 },
      { name: 'Mixed Berry Blast', sales: 6, revenue: 9963, percentage: 8.0 }
    ];

    // Calculate growth percentages
    const currentRevenue = parseFloat(currentStats.revenue || 0);
    const previousRevenue = parseFloat(previousStats.revenue || 0);
    const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

    const currentOrders = parseInt(currentStats.order_count || 0);
    const previousOrders = parseInt(previousStats.order_count || 0);
    const ordersGrowth = previousOrders > 0 ? ((currentOrders - previousOrders) / previousOrders) * 100 : 0;

    const currentAov = parseFloat(currentStats.avg_order_value || 0);
    const previousAov = parseFloat(previousStats.avg_order_value || 0);
    const aovGrowth = previousAov > 0 ? ((currentAov - previousAov) / previousAov) * 100 : 0;

    // Mock conversion rate (in real app, you'd track visits/sessions)
    const conversionRate = { current: 3.2, previous: 2.8, growth: 14.3 };

    // Customer metrics (simplified for this example)
    const totalCustomers = await dbGet(`
      SELECT COUNT(DISTINCT customer_email) as count 
      FROM orders 
      WHERE created_at >= $1
    `, [currentPeriodStart.toISOString()]);

    const newCustomers = Math.floor(parseInt(totalCustomers.count) * 0.74); // Mock calculation
    const returningCustomers = parseInt(totalCustomers.count) - newCustomers;

    res.json({
      success: true,
      data: {
        revenue: {
          current: currentRevenue,
          previous: previousRevenue,
          growth: revenueGrowth
        },
        orders: {
          current: currentOrders,
          previous: previousOrders,
          growth: ordersGrowth
        },
        averageOrderValue: {
          current: currentAov,
          previous: previousAov,
          growth: aovGrowth
        },
        conversionRate,
        topProducts,
        revenueByDay: dailyRevenue.map(day => ({
          date: day.date,
          revenue: parseFloat(day.revenue),
          orders: parseInt(day.orders)
        })),
        ordersByStatus: ordersByStatus.map(status => ({
          status: status.status,
          count: parseInt(status.count),
          percentage: parseFloat(status.percentage)
        })),
        customerMetrics: {
          newCustomers,
          returningCustomers,
          totalCustomers: parseInt(totalCustomers.count)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get order statistics (kept for backward compatibility)
router.get('/stats', verifyMerchantToken, async (req, res, next) => {
  try {
    const stats = await dbAll(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(CAST(total_amount AS DECIMAL)) as total_amount
      FROM orders 
      GROUP BY status
    `);

    const totalOrders = await dbGet(`
      SELECT COUNT(*) as count, SUM(CAST(total_amount AS DECIMAL)) as total_revenue
      FROM orders
    `);

    const recentOrders = await dbAll(`
      SELECT order_number, customer_name, total_amount, status, created_at
      FROM orders 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        ordersByStatus: stats,
        totalOrders: parseInt(totalOrders.count),
        totalRevenue: parseFloat(totalOrders.total_revenue || 0),
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router; 