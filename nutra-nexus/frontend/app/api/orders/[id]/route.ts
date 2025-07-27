import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    
    // Call the backend API - use service name for inter-container communication
    const backendUrl = process.env.BACKEND_URL || 'http://backend:8000'
    const response = await fetch(`${backendUrl}/api/orders/${id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.success || !data.data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(data.data)
  } catch (error) {
    console.error(`Error fetching order with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { status } = await request.json()

    // Call the backend API to update order status - use service name for inter-container communication
    const backendUrl = process.env.BACKEND_URL || 'http://backend:8000'
    const response = await fetch(`${backendUrl}/api/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json({ error: data.error || "Failed to update order" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error updating order with ID ${params.id}:`, error)
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
