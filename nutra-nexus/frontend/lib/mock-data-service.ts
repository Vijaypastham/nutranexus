// Mock product data
export const products = [
  {
    id: 1,
    name: "Unflavored Nutripro+",
    description: "Pure and natural blend with the original taste of Nutripro+",
    price: 1499.0,
    image_url: "/images/unflavored.jpeg",
    flavor: "Unflavored",
    stock: 50,
    is_active: true,
  },
  {
    id: 2,
    name: "Chocolate Nutripro+",
    description: "Rich chocolate flavor combined with nutritious Nutripro+",
    price: 1699.0,
    image_url: "/images/chocolate.jpeg",
    flavor: "Chocolate",
    stock: 45,
    is_active: true,
  },
  {
    id: 3,
    name: "Strawberry Nutripro+",
    description: "Sweet strawberry taste with all the goodness of Nutripro+",
    price: 1699.0,
    image_url: "/images/strawberry.jpeg",
    flavor: "Strawberry",
    stock: 40,
    is_active: true,
  },
]

// Mock order data
export const orders = [
  {
    id: 1,
    customer_name: "John Doe",
    phone: "9876543210",
    email: "john@example.com",
    address: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    postal_code: "400001",
    products: JSON.stringify([{ id: 1, name: "Unflavored Nutripro+", price: 1499, quantity: 2 }]),
    notes: "Please deliver in the evening",
    status: "delivered",
    created_at: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    customer_name: "Jane Smith",
    phone: "8765432109",
    email: "jane@example.com",
    address: "456 Park Ave",
    city: "Delhi",
    state: "Delhi",
    postal_code: "110001",
    products: JSON.stringify([
      { id: 2, name: "Chocolate Nutripro+", price: 1699, quantity: 1 },
      { id: 3, name: "Strawberry Nutripro+", price: 1699, quantity: 1 },
    ]),
    notes: "",
    status: "shipped",
    created_at: "2023-05-20T14:45:00Z",
  },
  {
    id: 3,
    customer_name: "Raj Patel",
    phone: "7654321098",
    email: "raj@example.com",
    address: "789 Lake Rd",
    city: "Bangalore",
    state: "Karnataka",
    postal_code: "560001",
    products: JSON.stringify([{ id: 3, name: "Strawberry Nutripro+", price: 1699, quantity: 3 }]),
    notes: "Gift wrap please",
    status: "processing",
    created_at: "2023-05-25T09:15:00Z",
  },
  {
    id: 4,
    customer_name: "Priya Sharma",
    phone: "6543210987",
    email: "priya@example.com",
    address: "101 Hill View",
    city: "Chennai",
    state: "Tamil Nadu",
    postal_code: "600001",
    products: JSON.stringify([
      { id: 1, name: "Unflavored Nutripro+", price: 1499, quantity: 1 },
      { id: 2, name: "Chocolate Nutripro+", price: 1699, quantity: 1 },
    ]),
    notes: "",
    status: "pending",
    created_at: "2023-05-28T16:20:00Z",
  },
  {
    id: 5,
    customer_name: "Amit Kumar",
    phone: "5432109876",
    email: "amit@example.com",
    address: "202 River Side",
    city: "Kolkata",
    state: "West Bengal",
    postal_code: "700001",
    products: JSON.stringify([{ id: 2, name: "Chocolate Nutripro+", price: 1699, quantity: 2 }]),
    notes: "Call before delivery",
    status: "cancelled",
    created_at: "2023-05-30T11:10:00Z",
  },
]

// Mock customers data
export const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    postal_code: "400001",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "8765432109",
    address: "456 Park Ave",
    city: "Delhi",
    state: "Delhi",
    postal_code: "110001",
  },
  {
    id: 3,
    name: "Raj Patel",
    email: "raj@example.com",
    phone: "7654321098",
    address: "789 Lake Rd",
    city: "Bangalore",
    state: "Karnataka",
    postal_code: "560001",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "6543210987",
    address: "101 Hill View",
    city: "Chennai",
    state: "Tamil Nadu",
    postal_code: "600001",
  },
  {
    id: 5,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "5432109876",
    address: "202 River Side",
    city: "Kolkata",
    state: "West Bengal",
    postal_code: "700001",
  },
]

// Mock data service functions
export function getAllProducts() {
  return products.filter((product) => product.is_active)
}

export function getProductById(id: string) {
  return products.find((product) => product.id.toString() === id && product.is_active) || null
}

export function getRelatedProducts(currentProductId: string) {
  return products.filter((product) => product.id.toString() !== currentProductId && product.is_active).slice(0, 3)
}

export function getAllOrders() {
  return [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function getOrderById(id: string) {
  return orders.find((order) => order.id.toString() === id) || null
}

export function updateOrderStatus(id: string, status: string) {
  const orderIndex = orders.findIndex((order) => order.id.toString() === id)
  if (orderIndex !== -1) {
    orders[orderIndex].status = status
    return { success: true }
  }
  return { success: false, error: "Order not found" }
}

export function getDashboardStats() {
  // Calculate total sales
  let totalSales = 0
  orders.forEach((order) => {
    const products = JSON.parse(order.products)
    products.forEach((product: any) => {
      totalSales += product.price * product.quantity
    })
  })

  return {
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalProducts: products.filter((p) => p.is_active).length,
    totalSales,
    recentOrders: getAllOrders().slice(0, 5),
  }
}

export function submitOrder(orderData: any) {
  // Generate a new order ID
  const newOrderId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1

  // Create a new order
  const newOrder = {
    id: newOrderId,
    customer_name: orderData.customerName,
    phone: orderData.phone,
    email: orderData.email,
    address: orderData.address,
    city: orderData.city,
    state: orderData.state,
    postal_code: orderData.postalCode,
    products: JSON.stringify(orderData.products),
    notes: orderData.notes || "",
    status: "pending",
    created_at: new Date().toISOString(),
  }

  // Add to orders array
  orders.push(newOrder)

  // Check if customer exists, if not add them
  const existingCustomer = customers.find((c) => c.email === orderData.email)
  if (!existingCustomer) {
    const newCustomerId = customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1
    customers.push({
      id: newCustomerId,
      name: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      state: orderData.state,
      postal_code: orderData.postalCode,
    })
  }

  return { success: true, orderId: newOrderId }
}
