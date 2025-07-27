import express from 'express';
import Stripe from 'stripe';
import { dbQuery, dbGet } from '../database/init';
import { logger } from '../utils/logger';

const router: express.Router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Stripe webhook handler
router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    if (!sig) {
      logger.error('Missing stripe-signature header');
      return res.status(400).send('Missing stripe-signature header');
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    logger.info(`Stripe webhook received: ${event.type}`, {
      eventId: event.id,
      type: event.type,
    });

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook signature verification failed:', error);
    return res.status(400).send(`Webhook Error: ${error}`);
  }
});

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const orderNumber = session.metadata?.orderNumber;

    if (!orderNumber) {
      logger.error('No order number in session metadata', { sessionId: session.id });
      return;
    }

    // Update order status
    await dbQuery(`
      UPDATE orders 
      SET status = 'paid', updated_at = CURRENT_TIMESTAMP
      WHERE order_number = $1
    `, [orderNumber]);

    logger.info(`Order marked as paid: ${orderNumber}`, {
      sessionId: session.id,
      orderNumber,
    });
  } catch (error) {
    logger.error('Error handling checkout session completed:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderNumber = paymentIntent.metadata?.orderNumber;

    if (!orderNumber) {
      logger.error('No order number in payment intent metadata', { 
        paymentIntentId: paymentIntent.id 
      });
      return;
    }

    // Get receipt URL from the charge
    let receiptUrl = null;
    const charges = (paymentIntent as any).charges;
    if (charges && charges.data[0]) {
      receiptUrl = charges.data[0].receipt_url;
    }

    // Update order with payment details
    await dbQuery(`
      UPDATE orders 
      SET 
        status = 'paid',
        stripe_payment_intent_id = $1,
        receipt_url = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE order_number = $3
    `, [paymentIntent.id, receiptUrl, orderNumber]);

    logger.info(`Payment succeeded for order: ${orderNumber}`, {
      paymentIntentId: paymentIntent.id,
      orderNumber,
      receiptUrl,
    });
  } catch (error) {
    logger.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderNumber = paymentIntent.metadata?.orderNumber;

    if (!orderNumber) {
      logger.error('No order number in payment intent metadata', { 
        paymentIntentId: paymentIntent.id 
      });
      return;
    }

    // Update order status to failed
    await dbQuery(`
      UPDATE orders 
      SET status = 'payment_failed', updated_at = CURRENT_TIMESTAMP
      WHERE order_number = $1
    `, [orderNumber]);

    logger.info(`Payment failed for order: ${orderNumber}`, {
      paymentIntentId: paymentIntent.id,
      orderNumber,
    });
  } catch (error) {
    logger.error('Error handling payment intent failed:', error);
  }
}

export default router; 