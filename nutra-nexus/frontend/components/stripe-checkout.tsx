"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ApiService } from "@/lib/api-service"
import { CartItem } from "@/components/cart-provider"

interface StripeCheckoutProps {
  cart: CartItem[]
  customerName: string
  customerEmail: string
  customerPhone: string
  totalAmount: number
  onSuccess: (orderNumber: string, sessionId: string) => void
  onError: (error: string) => void
}

export default function StripeCheckout({
  cart,
  customerName,
  customerEmail,
  customerPhone,
  totalAmount,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    // Validate inputs
    if (!customerName || !customerEmail || !customerPhone || cart.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and add items to cart",
        variant: "destructive",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    // Validate phone number (basic validation)
    if (customerPhone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Step 1: Create order in backend
      const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          flavor: item.flavor,
        })),
        totalAmount,
      }

      const { orderNumber } = await ApiService.createOrder(orderData)

      // Step 2: Create Stripe checkout session
      const successUrl = `${window.location.origin}/order-success?order_number=${orderNumber}`
      const cancelUrl = `${window.location.origin}/checkout?cancelled=true`

      const { url } = await ApiService.createCheckoutSession(
        orderNumber,
        successUrl,
        cancelUrl
      )

      // Step 3: Redirect to Stripe Checkout
      if (url) {
        // Call success callback before redirect
        onSuccess(orderNumber, '')
        
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Checkout failed'
      
      toast({
        title: "Checkout failed",
        description: errorMessage,
        variant: "destructive",
      })
      
      onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      className="w-full bg-[#1b4332] hover:bg-[#2d6a4f]"
      disabled={isLoading || cart.length === 0}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          Creating Order...
        </div>
      ) : (
        `Proceed to Payment - ₹${totalAmount.toFixed(2)}`
      )}
    </Button>
  )
} 