"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Receipt, ArrowRight } from "lucide-react"
import { ApiService } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"

interface Order {
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    flavor?: string
  }>
  total_amount: string  // PostgreSQL DECIMAL fields are returned as strings
  currency: string
  status: string
  receipt_url?: string
  created_at: string
  updated_at: string
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { clearCart } = useCart()

  const orderNumber = searchParams.get('order_number')
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (!orderNumber) {
      setError('No order number provided')
      setIsLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const orderData = await ApiService.getOrder(orderNumber)
        setOrder(orderData)
        
        // Clear cart after successful payment confirmation
        clearCart()
        
        // Show success toast
        toast({
          title: "Payment Successful!",
          description: `Your order ${orderNumber} has been confirmed.`,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order details'
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderNumber, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1b4332] border-t-transparent mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Order Not Found</CardTitle>
            <CardDescription>{error || 'Unable to load order details'}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your order. Your payment has been processed successfully.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
              <CardDescription>Order #{order.order_number}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-semibold">
                  ₹{Number(order.total_amount).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>

              {order.receipt_url && (
                <div className="pt-2">
                  <a 
                    href={order.receipt_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#1b4332] hover:underline"
                  >
                    <Receipt className="h-4 w-4" />
                    View Receipt
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Name:</span>
                <span className="ml-2">{order.customer_name}</span>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <span className="ml-2">{order.customer_email}</span>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <span className="ml-2">{order.customer_phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.flavor && (
                          <p className="text-sm text-gray-600">Flavor: {item.flavor}</p>
                        )}
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">
                          ₹{(item.price * item.quantity).toFixed(2)} total
                        </p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/order-tracking?order=${order.order_number}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Track Your Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/products">
            <Button className="w-full sm:w-auto bg-[#1b4332] hover:bg-[#2d6a4f]">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* What's Next */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-[#1b4332] text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  1
                </div>
                <h4 className="font-medium mb-1">Order Confirmed</h4>
                <p className="text-sm text-gray-600">Your order has been received and is being processed.</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  2
                </div>
                <h4 className="font-medium mb-1">Preparing</h4>
                <p className="text-sm text-gray-600">We're preparing your items for shipment.</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  3
                </div>
                <h4 className="font-medium mb-1">Shipped</h4>
                <p className="text-sm text-gray-600">Your order will be shipped and you'll receive tracking information.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
