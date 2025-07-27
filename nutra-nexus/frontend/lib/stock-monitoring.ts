import { sendLowStockAlert } from "./email-service"

// Stock threshold configuration
const STOCK_THRESHOLDS = {
  LOW: 10, // Products with stock <= 10 are considered low stock
  CRITICAL: 5, // Products with stock <= 5 are considered critical
  OUT_OF_STOCK: 0, // Products with stock = 0 are out of stock
}

// Admin email for alerts
const ADMIN_EMAIL = "admin@nutranexus.com"

// Track which alerts have been sent to avoid duplicates
const sentAlerts: Record<string, Date> = {}

// How often (in hours) to resend alerts for the same product
const ALERT_FREQUENCY = 24 // hours

/**
 * Check if an alert should be sent based on last sent time
 */
function shouldSendAlert(productId: string): boolean {
  if (!sentAlerts[productId]) return true

  const lastSent = sentAlerts[productId]
  const now = new Date()
  const hoursSinceLastAlert = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60)

  return hoursSinceLastAlert >= ALERT_FREQUENCY
}

/**
 * Mark an alert as sent
 */
function markAlertSent(productId: string): void {
  sentAlerts[productId] = new Date()
}

/**
 * Check stock levels and send alerts if necessary
 */
export async function monitorStockLevels(products: any[]): Promise<void> {
  // Filter products by stock level
  const outOfStock = products.filter((product) => product.stock === STOCK_THRESHOLDS.OUT_OF_STOCK)
  const lowStock = products.filter(
    (product) => product.stock > STOCK_THRESHOLDS.OUT_OF_STOCK && product.stock <= STOCK_THRESHOLDS.LOW,
  )

  // If no low stock or out of stock products, no need to send an alert
  if (outOfStock.length === 0 && lowStock.length === 0) {
    return
  }

  // Check if we should send alerts for these products
  const shouldAlert = [...outOfStock, ...lowStock].some((product) => shouldSendAlert(product.id))

  if (!shouldAlert) {
    return
  }

  // Prepare alert data
  const stockAlerts = {
    outOfStock,
    lowStock,
    timestamp: new Date().toISOString(),
  }

  try {
    // Send the email alert
    await sendLowStockAlert(ADMIN_EMAIL, stockAlerts)

    // Mark alerts as sent
    ;[...outOfStock, ...lowStock].forEach((product) => markAlertSent(product.id))

    console.log(`Stock alert email sent to ${ADMIN_EMAIL}`)
  } catch (error) {
    console.error("Failed to send stock alert email:", error)
  }
}

/**
 * Schedule regular stock monitoring
 * This would typically be called when the application starts
 */
export function scheduleStockMonitoring(getProducts: () => Promise<any[]>, intervalMinutes = 60): NodeJS.Timeout {
  console.log(`Scheduling stock monitoring every ${intervalMinutes} minutes`)

  // Run immediately on startup
  getProducts().then((products) => monitorStockLevels(products))

  // Then schedule regular checks
  return setInterval(
    async () => {
      const products = await getProducts()
      await monitorStockLevels(products)
    },
    intervalMinutes * 60 * 1000,
  )
}
