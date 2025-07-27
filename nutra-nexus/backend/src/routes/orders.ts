import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { dbQuery, dbGet } from '../database/init';
import { logger } from '../utils/logger';
import { createError } from '../middleware/errorHandler';

const router: express.Router = express.Router();

// Validation schemas
const createOrderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive(),
    flavor: z.string().optional(),
  })).min(1, 'At least one item is required'),
  totalAmount: z.number().positive('Total amount must be positive'),
});

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `NN${timestamp.slice(-6)}${random}`;
}

// Create a new order
router.post('/', async (req, res, next) => {
  try {
    const validatedData = createOrderSchema.parse(req.body);
    const orderNumber = generateOrderNumber();

    // Insert order into database
    await dbQuery(`
      INSERT INTO orders (
        order_number, customer_name, customer_email, customer_phone,
        items, total_amount, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      orderNumber,
      validatedData.customerName,
      validatedData.customerEmail,
      validatedData.customerPhone,
      JSON.stringify(validatedData.items),
      validatedData.totalAmount,
      'pending'
    ]);

    logger.info(`Order created: ${orderNumber}`, {
      orderNumber,
      customerEmail: validatedData.customerEmail,
      totalAmount: validatedData.totalAmount,
    });

    return res.status(201).json({
      success: true,
      data: {
        orderNumber,
        status: 'pending',
        message: 'Order created successfully',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation error',
          details: error.errors,
        },
      });
    }
    next(error);
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    if (!orderNumber || orderNumber.length < 8) {
      throw createError('Invalid order number format', 400);
    }

    const order = await dbGet(`
      SELECT 
        order_number, customer_name, customer_email, customer_phone,
        items, total_amount, currency, status, receipt_url,
        created_at, updated_at
      FROM orders 
      WHERE order_number = $1
    `, [orderNumber]);

    if (!order) {
      throw createError('Order not found', 404);
    }

    // Parse items from JSON - handle both string and object cases
    const parsedOrder = {
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
    };

    res.json({
      success: true,
      data: parsedOrder,
    });
  } catch (error) {
    next(error);
  }
});

// Update order status (internal use)
router.put('/:orderNumber/status', async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const { status, stripePaymentIntentId, receiptUrl } = req.body;

    if (!['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      throw createError('Invalid status', 400);
    }

    const updateFields = ['status = ?', 'updated_at = CURRENT_TIMESTAMP'];
    const updateValues = [status];

    if (stripePaymentIntentId) {
      updateFields.push('stripe_payment_intent_id = ?');
      updateValues.push(stripePaymentIntentId);
    }

    if (receiptUrl) {
      updateFields.push('receipt_url = ?');
      updateValues.push(receiptUrl);
    }

    updateValues.push(orderNumber);

    await dbQuery(`
      UPDATE orders 
      SET ${updateFields.join(', ')}
      WHERE order_number = $${updateValues.length}
    `, updateValues);

    logger.info(`Order status updated: ${orderNumber} -> ${status}`);

    res.json({
      success: true,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router; 