"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, Package, Receipt, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import OrderTrackingStatus from "@/components/order-tracking-status"
import { ApiService } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"

function OrderTrackingContent() {
  const [orderNumber, setOrderNumber] = useState("")
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()

  // Check for order number in URL params
  useEffect(() => {
    const orderParam = searchParams.get('order')
    if (orderParam) {
      setOrderNumber(orderParam)
      handleSearch(undefined, orderParam)
    }
  }, [searchParams])

  const handleSearch = async (e?: React.FormEvent, orderNum?: string) => {
    if (e) e.preventDefault()
    
    const searchOrderNumber = orderNum || orderNumber
    
    if (!searchOrderNumber.trim()) {
      setError("Please enter an order number")
      return
    }

    setError("")
    setOrder(null)
    setIsSearching(true)

    try {
      const orderData = await ApiService.getOrder(searchOrderNumber.trim())
      setOrder(orderData)
      
      toast({
        title: "Order Found!",
        description: `Order ${searchOrderNumber} details loaded successfully.`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Order not found'
      setError(errorMessage)
      setOrder(null)
      
      toast({
        title: "Order Not Found",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="container px-4 py-12 md:px-6 min-h-screen bg-gray-50">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-[#1b4332] hover:text-[#2d6a4f]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Search Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
            <CardTitle className="text-2xl">Track Your Order</CardTitle>
            <CardDescription className="text-gray-200">
              Enter your order number to check the status and details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="orderNumber" className="text-sm font-medium">
                  Order Number
                </label>
                <Input
                  id="orderNumber"
                  placeholder="e.g. NN123456789"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="text-lg"
                  required
                />
                <p className="text-xs text-gray-600">
                  You can find your order number in the confirmation email or on the order success page
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] py-3 text-lg" 
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Track Order
                  </>
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
                <p className="font-medium">Order not found</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Status */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Order #{order.order_number}</CardTitle>
                    <CardDescription>
                      Placed on {new Date(order.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <OrderTrackingStatus status={order.status} />

                {order.receipt_url && (
                  <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Receipt className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Payment Receipt</p>
                          <p className="text-sm text-blue-700">Your payment has been processed successfully</p>
                        </div>
                      </div>
                      <a 
                        href={order.receipt_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                      >
                        View Receipt
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Details Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Order Items */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.flavor && <p className="text-sm text-gray-600">Flavor: {item.flavor}</p>}
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(item.price)}</p>
                          <p className="text-sm text-gray-600">{formatPrice(item.price * item.quantity)} total</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-[#1b4332]">{formatPrice(order.total_amount)} {order.currency}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Customer & Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">{order.customer_name}</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{order.customer_email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{order.customer_phone}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Order Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Created: {new Date(order.created_at).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Updated: {new Date(order.updated_at).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {order.stripe_payment_intent_id && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Payment Information</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">Payment ID: {order.stripe_payment_intent_id}</p>
                          <p className="text-green-600 font-medium">✓ Payment Verified</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild className="bg-[#1b4332] hover:bg-[#2d6a4f]">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1b4332] border-t-transparent mx-auto mb-4"></div>
          <p>Loading order tracking...</p>
        </div>
      </div>
    }>
      <OrderTrackingContent />
    </Suspense>
  )
}
