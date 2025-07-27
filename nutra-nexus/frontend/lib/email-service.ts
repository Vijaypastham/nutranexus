// This is a mock email service for demonstration purposes
// In a real application, you would use a service like SendGrid, Mailgun, or AWS SES

export async function sendOrderConfirmationEmail(email: string, orderDetails: any) {
  // In a real application, you would call your email service API here
  console.log(`Sending order confirmation email to ${email}`)
  console.log("Order details:", orderDetails)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email sent successfully")
      resolve(true)
    }, 1000)
  })
}

export async function sendLowStockAlert(email: string, stockAlerts: any) {
  // In a real application, you would call your email service API here
  console.log(`Sending low stock alert email to ${email}`)
  console.log("Stock alerts:", stockAlerts)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Low stock alert email sent successfully")
      resolve(true)
    }, 1000)
  })
}

// Example email template that would be used in a real implementation
export function getOrderConfirmationEmailTemplate(orderDetails: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - Nutra Nexus</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1b4332; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-summary { margin-top: 20px; }
        .product { display: flex; margin-bottom: 10px; }
        .product-details { flex: 1; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
        .button { background-color: #1b4332; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order!</p>
        </div>
        <div class="content">
          <p>Dear ${orderDetails.customerName},</p>
          <p>Your order has been received and is being processed. Here's a summary of your purchase:</p>
          
          <div class="order-summary">
            <h2>Order Details</h2>
            <p><strong>Order Number:</strong> ${orderDetails.id}</p>
            <p><strong>Order Date:</strong> ${new Date(orderDetails.date).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
            
            <h3>Items Ordered</h3>
            ${orderDetails.products
              .map(
                (product: any) => `
              <div class="product">
                <div class="product-details">
                  <p><strong>${product.name}</strong> - ${product.flavor}</p>
                  <p>Quantity: ${product.quantity} × ₹${product.price}</p>
                </div>
                <div class="product-price">
                  <p>₹${product.price * product.quantity}</p>
                </div>
              </div>
            `,
              )
              .join("")}
            
            <p><strong>Subtotal:</strong> ₹${orderDetails.total - (orderDetails.shipping || 0)}</p>
            <p><strong>Shipping:</strong> ${orderDetails.shipping ? `₹${orderDetails.shipping}` : "Free"}</p>
            <p><strong>Total:</strong> ₹${orderDetails.total}</p>
          </div>
          
          <div class="shipping-info">
            <h2>Shipping Information</h2>
            <p>${orderDetails.customerName}</p>
            <p>${orderDetails.shipping.address}</p>
            <p>${orderDetails.shipping.city}, ${orderDetails.shipping.state} ${orderDetails.shipping.postalCode}</p>
            <p>${orderDetails.shipping.country}</p>
          </div>
          
          <p>You can track your order status by visiting our website and entering your order number.</p>
          
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://www.nutranexus.com/order-tracking" class="button">Track Your Order</a>
          </p>
        </div>
        <div class="footer">
          <p>If you have any questions about your order, please contact our customer support at organicnutranexus@gmail.com</p>
          <p>© ${new Date().getFullYear()} Nutra Nexus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Low stock alert email template
export function getLowStockAlertEmailTemplate(stockAlerts: any) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Low Stock Alert - Nutra Nexus</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #e53e3e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .alert-summary { margin-top: 20px; }
        .product { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
        .critical { background-color: #FEE2E2; padding: 10px; border-left: 4px solid #e53e3e; }
        .warning { background-color: #FEF3C7; padding: 10px; border-left: 4px solid #F59E0B; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
        .button { background-color: #1b4332; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        .stock-level { font-weight: bold; }
        .out-of-stock { color: #e53e3e; }
        .low-stock { color: #F59E0B; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ Low Stock Alert</h1>
          <p>Inventory Requires Attention</p>
        </div>
        <div class="content">
          <p>Hello Admin,</p>
          <p>This is an automated alert to inform you that the following products have fallen below the minimum stock threshold and require immediate attention.</p>
          
          <div class="alert-summary">
            <h2>Low Stock Summary - ${currentDate}</h2>
            
            ${
              stockAlerts.outOfStock.length > 0
                ? `
            <div class="critical">
              <h3>⛔ Out of Stock Items (${stockAlerts.outOfStock.length})</h3>
              <p>These products are completely out of stock and should be restocked immediately to avoid lost sales.</p>
            </div>
            <table>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Recommended Order</th>
              </tr>
              ${stockAlerts.outOfStock
                .map(
                  (product: any) => `
                <tr>
                  <td>${product.name} - ${product.flavor}</td>
                  <td>${product.id}</td>
                  <td class="stock-level out-of-stock">0</td>
                  <td>50+ units</td>
                </tr>
              `,
                )
                .join("")}
            </table>
            `
                : ""
            }
            
            ${
              stockAlerts.lowStock.length > 0
                ? `
            <div class="warning">
              <h3>⚠️ Low Stock Items (${stockAlerts.lowStock.length})</h3>
              <p>These products are running low and should be restocked soon.</p>
            </div>
            <table>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Recommended Order</th>
              </tr>
              ${stockAlerts.lowStock
                .map(
                  (product: any) => `
                <tr>
                  <td>${product.name} - ${product.flavor}</td>
                  <td>${product.id}</td>
                  <td class="stock-level low-stock">${product.stock}</td>
                  <td>${Math.max(50 - product.stock, 20)}+ units</td>
                </tr>
              `,
                )
                .join("")}
            </table>
            `
                : ""
            }
          </div>
          
          <p>Please take action to restock these items as soon as possible to ensure continuous product availability for your customers.</p>
          
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://www.nutranexus.com/admin/dashboard/products" class="button">Manage Inventory</a>
          </p>
        </div>
        <div class="footer">
          <p>This is an automated message from the Nutra Nexus inventory management system.</p>
          <p>You can adjust stock alert thresholds in your admin settings.</p>
          <p>© ${new Date().getFullYear()} Nutra Nexus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
