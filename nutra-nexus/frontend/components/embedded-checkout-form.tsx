"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart, X } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface EmbeddedCheckoutFormProps {
  isOpen: boolean
  onClose: () => void
  product?: {
    id: number
    name: string
    flavor: string
    price: number
    image_url: string
  }
}

export default function EmbeddedCheckoutForm({ isOpen, onClose, product }: EmbeddedCheckoutFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(product?.flavor || "unflavored")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const products = [
    { flavor: "unflavored", name: "NutriPro+ Unflavored", price: 1299 },
    { flavor: "chocolate", name: "NutriPro+ Chocolate", price: 1399 },
    { flavor: "strawberry", name: "NutriPro+ Strawberry", price: 1399 },
  ]

  const currentProduct = products.find((p) => p.flavor === selectedProduct) || products[0]
  const subtotal = currentProduct.price * quantity
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create order data
      const orderData = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        items: [{
          id: currentProduct.flavor,
          name: currentProduct.name,
          price: currentProduct.price,
          quantity: quantity,
          flavor: currentProduct.flavor,
        }],
        totalAmount: total,
      }

      const { ApiService } = await import("@/lib/api-service")
      const { orderNumber } = await ApiService.createOrder(orderData)

      // Create Stripe checkout session
      const successUrl = `${window.location.origin}/order-success?order_number=${orderNumber}`
      const cancelUrl = `${window.location.origin}/?cancelled=true`

      const { url } = await ApiService.createCheckoutSession(
        orderNumber,
        successUrl,
        cancelUrl
      )

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert("Checkout failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1b4332]">Complete Your Order</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Order Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription className="text-gray-200">Premium Nutrition Blend</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Select Product</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unflavored">NutriPro+ Unflavored - ₹1,299</SelectItem>
                        <SelectItem value="chocolate">NutriPro+ Chocolate - ₹1,399</SelectItem>
                        <SelectItem value="strawberry">NutriPro+ Strawberry - ₹1,399</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Quantity</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
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
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-t-lg">
                <CardTitle className="text-xl">Delivery Information</CardTitle>
                <CardDescription className="text-gray-200">Please provide your delivery details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
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

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
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
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Any special delivery instructions..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`w-full py-3 text-lg font-bold shadow-lg transition-all duration-300 ${
                      isFormValid
                        ? "bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#3a8a68] text-white hover:shadow-xl hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Place Order - {formatPrice(total)}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
