"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"

export default function CartSheet() {
  const {
    cart: items,
    removeFromCart: removeItem,
    updateQuantity,
    totalItems: itemCount,
    totalPrice: total,
  } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        <span className="sr-only">Open cart</span>
      </Button>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1b4332] text-xs text-white dark:bg-[#3a8a68]">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <div className="text-xl font-medium">Your cart is empty</div>
              <div className="text-sm text-muted-foreground">Add items to your cart to see them here.</div>
              <Button
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-[#1b4332] hover:bg-[#2d6a4f] dark:bg-[#2d6a4f] dark:hover:bg-[#3a8a68]"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate pr-2">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground flex-shrink-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.flavor}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-md border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <div className="flex h-8 w-10 items-center justify-center text-sm">{item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{formatPrice(total > 1000 ? 0 : 100)}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(total > 1000 ? total : total + 100)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {total > 1000 ? "Free shipping on orders over ₹1,000" : ""}
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                asChild
                className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] dark:bg-[#2d6a4f] dark:hover:bg-[#3a8a68]"
              >
                <Link href="/checkout">
                  Checkout
                </Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
