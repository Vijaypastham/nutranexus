import express from 'express';
import Stripe from 'stripe';
import { z } from 'zod';
import { dbQuery, dbGet } from '../database/init';
import { logger } from '../utils/logger';
import { createError } from '../middleware/errorHandler';

const router: express.Router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

// Product image mapping for Stripe checkout
const productImageMap: Record<string, string> = {
  'Unflavored': 'http://localhost:3000/images/unflavored.jpeg',
  'Chocolate': 'http://localhost:3000/images/chocolate.jpeg', 
  'Strawberry': 'http://localhost:3000/images/strawberry.jpeg',
};

// Helper function to get product image URL
const getProductImageUrl = (productName: string, flavor?: string): string | undefined => {
  // Try to match by flavor first
  if (flavor && productImageMap[flavor]) {
    return productImageMap[flavor];
  }
  
  // Try to extract flavor from product name
  for (const [flavorKey, imageUrl] of Object.entries(productImageMap)) {
    if (productName.toLowerCase().includes(flavorKey.toLowerCase())) {
      return imageUrl;
    }
  }
  
  // Default to unflavored if no match
  return productImageMap['Unflavored'];
};

// Validation schema for checkout session
const createCheckoutSessionSchema = z.object({
  orderNumber: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

// Create Stripe checkout session
router.post('/create-checkout-session', async (req, res, next) => {
  try {
    const { orderNumber, successUrl, cancelUrl } = createCheckoutSessionSchema.parse(req.body);

    // Get order from database
    const order = await dbGet(`
      SELECT 
        order_number, customer_name, customer_email, customer_phone,
        items, total_amount, currency, status
      FROM orders 
      WHERE order_number = $1
    `, [orderNumber]);

    if (!order) {
      throw createError('Order not found', 404);
    }

    if (order.status !== 'pending') {
      throw createError('Order is not available for payment', 400);
    }

    // Handle items - JSONB is automatically parsed by PostgreSQL
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: order.currency.toLowerCase(),
        product_data: {
          name: item.name,
          description: item.flavor ? `Flavor: ${item.flavor}` : undefined,
          images: [getProductImageUrl(item.name, item.flavor)].filter(Boolean),
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&order_number=${orderNumber}`,
      cancel_url: cancelUrl,
      customer_email: order.customer_email,
      metadata: {
        orderNumber,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
      },
      payment_intent_data: {
        metadata: {
          orderNumber,
        },
      },
    });

    // Update order with session ID
    await dbQuery(`
      UPDATE orders 
      SET stripe_session_id = $1, updated_at = CURRENT_TIMESTAMP
      WHERE order_number = $2
    `, [session.id, orderNumber]);

    logger.info(`Stripe checkout session created for order: ${orderNumber}`, {
      sessionId: session.id,
      orderNumber,
    });

    res.json({
      success: true,
      data: {
        url: session.url,
        sessionId: session.id,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get checkout session status
router.get('/session/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      success: true,
      data: {
        status: session.status,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      },
    });
  } catch (error) {
    logger.error('Error retrieving Stripe session:', error);
    next(createError('Session not found', 404));
  }
});

// Get payment intent details (for receipt)
router.get('/payment-intent/:paymentIntentId', async (req, res, next) => {
  try {
    const { paymentIntentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['charges']
    });

    // Type assertion for expanded charges
    const charges = (paymentIntent as any).charges;
    if (!charges || !charges.data[0]) {
      throw createError('No charge found for this payment', 404);
    }

    const charge = charges.data[0];

    res.json({
      success: true,
      data: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        receiptUrl: charge.receipt_url,
        created: paymentIntent.created,
        metadata: paymentIntent.metadata,
      },
    });
  } catch (error) {
    logger.error('Error retrieving payment intent:', error);
    next(createError('Payment intent not found', 404));
  }
});

export default router; 