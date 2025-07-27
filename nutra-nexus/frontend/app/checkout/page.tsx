"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, ArrowLeft, CreditCard, Shield, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import StripeCheckout from "@/components/stripe-checkout"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  notes: string
}

function CheckoutContent() {
  const { cart, totalItems, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })

  const cancelled = searchParams.get('cancelled')

  useEffect(() => {
    if (cancelled) {
      toast({
        title: "Payment Cancelled",
        description: "Your payment was cancelled. You can try again when ready.",
        variant: "destructive",
      })
    }
  }, [cancelled, toast])

  const subtotal = totalPrice
  const shipping = subtotal > 1000 ? 0 : 100
  const total = subtotal + shipping

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address

  const handleStripeSuccess = (orderNumber: string, sessionId: string) => {
    // Don't clear cart here - it will be cleared after successful payment
    toast({
      title: "Order Created Successfully!",
      description: `Order ${orderNumber} has been created. Redirecting to payment...`,
    })
  }

  const handleStripeError = (error: string) => {
    toast({
      title: "Checkout Failed",
      description: error,
      variant: "destructive",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
              <CardDescription>Add some products to your cart to continue with checkout</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/products">
                <Button className="bg-[#1b4332] hover:bg-[#2d6a4f]">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-[#1b4332] hover:text-[#2d6a4f] mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your order securely with Stripe</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Customer Information */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription className="text-gray-200">
                  We'll use this information for order updates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
                <CardTitle className="text-xl">Shipping Address</CardTitle>
                <CardDescription className="text-gray-200">
                  Where should we deliver your order?
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={customerInfo.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Delivery Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Any special delivery instructions..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Checkout</h4>
                    <p className="text-sm text-blue-700">
                      Your payment information is encrypted and secure with Stripe
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription className="text-gray-200">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.flavor && (
                            <p className="text-sm text-gray-600">Flavor: {item.flavor}</p>
                          )}
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Free
                          </Badge>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Truck className="h-4 w-4" />
                        <span>Free shipping on orders over ₹1,000</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] bg-clip-text text-transparent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Secure payment powered by Stripe
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Click below to proceed to secure payment
                    </p>
                    <StripeCheckout
                      cart={cart}
                      customerName={customerInfo.name}
                      customerEmail={customerInfo.email}
                      customerPhone={customerInfo.phone}
                      totalAmount={total}
                      onSuccess={handleStripeSuccess}
                      onError={handleStripeError}
                    />
                  </div>
                  
                  {!isFormValid && (
                    <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Please fill in all required fields to continue
                      </p>
                    </div>
                  )}

                  <div className="text-center text-xs text-gray-500">
                    <p>Your payment is protected by Stripe's secure encryption</p>
                    <p className="mt-1">We accept all major credit and debit cards</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1b4332] border-t-transparent mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
} 