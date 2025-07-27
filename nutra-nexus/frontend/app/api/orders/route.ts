import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Call the backend API to get all orders
    const backendUrl = process.env.BACKEND_URL || 'http://backend:8000'
    const response = await fetch(`${backendUrl}/api/orders`)
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data.success ? data.data : [])
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    
    // Call the backend API to create order
    const backendUrl = process.env.BACKEND_URL || 'http://backend:8000'
    const response = await fetch(`${backendUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create order')
    }

    return NextResponse.json({
      success: true,
      orderNumber: data.data.orderNumber,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
