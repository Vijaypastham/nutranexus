"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DiscountSystemProps {
  subtotal: number
  onApplyDiscount: (discountAmount: number, code: string) => void
  onRemoveDiscount: () => void
}

// Mock coupon codes for demonstration
const VALID_COUPONS = [
  { code: "WELCOME10", discount: 0.1, minAmount: 0, description: "10% off your order" },
  { code: "NUTRA20", discount: 0.2, minAmount: 2000, description: "20% off orders above ₹2,000" },
  { code: "FREESHIP", discount: 100, minAmount: 0, isFixed: true, description: "₹100 off shipping" },
  { code: "FIRST500", discount: 500, minAmount: 3000, isFixed: true, description: "₹500 off orders above ₹3,000" },
]

export default function DiscountSystem({ subtotal, onApplyDiscount, onRemoveDiscount }: DiscountSystemProps) {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(false)

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code")
      return
    }

    setIsChecking(true)
    setError("")

    // Simulate API call to validate coupon
    setTimeout(() => {
      const foundCoupon = VALID_COUPONS.find(
        (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase() && subtotal >= coupon.minAmount,
      )

      if (foundCoupon) {
        const discountAmount = foundCoupon.isFixed ? foundCoupon.discount : Math.round(subtotal * foundCoupon.discount)

        setAppliedCoupon(foundCoupon)
        onApplyDiscount(discountAmount, foundCoupon.code)
      } else {
        // Check if it's a valid coupon but minimum amount not met
        const validButMinNotMet = VALID_COUPONS.find(
          (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase() && subtotal < coupon.minAmount,
        )

        if (validButMinNotMet) {
          setError(`This coupon requires a minimum order of ₹${validButMinNotMet.minAmount}`)
        } else {
          setError("Invalid or expired coupon code")
        }
      }

      setIsChecking(false)
    }, 1000)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    onRemoveDiscount()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Have a coupon?</h3>
      </div>

      {!appliedCoupon ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
            </div>
            <Button onClick={handleApplyCoupon} disabled={isChecking} className="bg-[#1b4332] hover:bg-[#2d6a4f]">
              {isChecking ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="rounded-md bg-green-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{appliedCoupon.code}</p>
                <p className="text-xs text-green-700">{appliedCoupon.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Remove coupon</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-1 text-xs text-muted-foreground">
        <p>Available coupons:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Use code <span className="font-medium">WELCOME10</span> for 10% off your first order
          </li>
          <li>
            Use code <span className="font-medium">NUTRA20</span> for 20% off orders above ₹2,000
          </li>
          <li>
            Use code <span className="font-medium">FIRST500</span> for ₹500 off orders above ₹3,000
          </li>
        </ul>
      </div>
    </div>
  )
}
