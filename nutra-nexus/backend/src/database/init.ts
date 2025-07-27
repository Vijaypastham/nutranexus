import { Pool, QueryResult } from 'pg';
import { logger } from '../utils/logger';

// Create database connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'nutra_nexus',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database query functions
export const dbQuery = async (text: string, params?: any[]): Promise<QueryResult> => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

export const dbGet = async (text: string, params?: any[]): Promise<any> => {
  const result = await dbQuery(text, params);
  return result.rows[0];
};

export const dbAll = async (text: string, params?: any[]): Promise<any[]> => {
  const result = await dbQuery(text, params);
  return result.rows;
};

export async function initializeDatabase() {
  try {
    // Test database connection
    await dbQuery('SELECT NOW()');
    logger.info('Database connection established successfully');

    // Create orders table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(255) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(255) NOT NULL,
        items JSONB NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'INR',
        status VARCHAR(50) DEFAULT 'pending',
        stripe_payment_intent_id VARCHAR(255),
        stripe_session_id VARCHAR(255),
        receipt_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index on order_number for fast lookups
    await dbQuery(`
      CREATE INDEX IF NOT EXISTS idx_order_number ON orders(order_number)
    `);

    // Create index on stripe_payment_intent_id
    await dbQuery(`
      CREATE INDEX IF NOT EXISTS idx_stripe_payment_intent ON orders(stripe_payment_intent_id)
    `);

    // Create updated_at trigger function if it doesn't exist
    await dbQuery(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create trigger for updated_at
    await dbQuery(`
      DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
      CREATE TRIGGER update_orders_updated_at
        BEFORE UPDATE ON orders
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    logger.info('Database tables created successfully');
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down database connection pool...');
  await pool.end();
  process.exit(0);
});

export { pool }; 