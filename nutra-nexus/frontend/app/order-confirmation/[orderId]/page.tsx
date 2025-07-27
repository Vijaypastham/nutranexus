"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Download, Mail, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { mockOrders } from "@/lib/mock-data"
import { sendOrderConfirmationEmail } from "@/lib/email-service"
import OrderTrackingStatus from "@/components/order-tracking-status"

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [emailSent, setEmailSent] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // First check localStorage for the order (for newly created orders)
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const storedOrder = storedOrders.find((o: any) => o.id === params.orderId)

    if (storedOrder) {
      setOrder(storedOrder)
      setIsLoading(false)
    } else {
      // Fallback to mock data if not found in localStorage
      const foundOrder = mockOrders.find((o) => o.id === params.orderId)

      // Simulate API call
      setTimeout(() => {
        setOrder(foundOrder || mockOrders[0]) // Fallback to first order if not found
        setIsLoading(false)
      }, 500)
    }
  }, [params.orderId])

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      const printContent = receiptRef.current
      const windowUrl = "about:blank"
      const uniqueName = `print_${new Date().getTime()}`
      const windowFeatures = "width=800,height=600,top=100,left=100"

      const printWindow = window.open(windowUrl, uniqueName, windowFeatures)

      printWindow?.document.write(`
        <html>
          <head>
            <title>Nutra Nexus Order Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .order-details { margin-bottom: 20px; }
              .product-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
              .totals { margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `)

      printWindow?.document.close()

      setTimeout(() => {
        printWindow?.print()
        printWindow?.close()
      }, 500)
    }
  }

  const handleSendEmail = async () => {
    if (!order) return

    try {
      await sendOrderConfirmationEmail(order.customerEmail, order)
      setEmailSent(true)

      // Reset email sent status after 5 seconds
      setTimeout(() => setEmailSent(false), 5000)
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1b4332] border-t-transparent"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center md:px-6">
        <h1 className="text-3xl font-bold">Order Not Found</h1>
        <p className="mt-4 text-muted-foreground">The order you're looking for doesn't exist.</p>
        <Button asChild className="mt-8 bg-[#1b4332] hover:bg-[#2d6a4f]">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  const subtotal =
    order.products?.reduce((total: number, product: any) => total + product.price * product.quantity, 0) || order.total
  const shipping = subtotal > 1000 ? 0 : 100
  const total = order.total || subtotal + shipping

  return (
    <main className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-[#d4a373]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="overflow-hidden">
          <div className="bg-[#1b4332] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Order Confirmation</h1>
                <p className="text-gray-200">Thank you for your order!</p>
              </div>
              <div className="relative h-12 w-12">
                <Image src="/images/logo.png" alt="Nutra Nexus Logo" fill className="object-contain" />
              </div>
            </div>
          </div>
          <CardContent className="p-6" ref={receiptRef}>
            <div className="mb-6 rounded-lg bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-green-800">Order Placed Successfully</h2>
                  <p className="text-sm text-green-700">Your order has been received and is being processed.</p>
                </div>
              </div>
            </div>

            {order.razorpayPaymentId && (
              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <h3 className="font-medium text-blue-800">Payment Information</h3>
                <p className="text-sm text-blue-700">Payment ID: {order.razorpayPaymentId}</p>
                <p className="text-sm text-blue-700">Payment Status: Completed</p>
              </div>
            )}

            <OrderTrackingStatus status={order.status || "confirmed"} />

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Order Number</h3>
                <p className="text-lg font-semibold">{order.id}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Order Date</h3>
                <p className="text-lg font-semibold">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
              <div className="space-y-4">
                {order.products?.map((product: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={
                          product.image || `/images/${product.name?.split(" ")[0]?.toLowerCase() || "unflavored"}.jpeg`
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {formatPrice(product.price)} × {product.quantity}
                        </span>
                        <span className="font-medium text-foreground">
                          {formatPrice(product.price * product.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Shipping Address</h3>
                <address className="not-italic text-muted-foreground">
                  <p>{order.customerName}</p>
                  <p>{order.shipping?.address || order.shippingAddress?.address}</p>
                  <p>
                    {order.shipping?.city || order.shippingAddress?.city},
                    {order.shipping?.state || order.shippingAddress?.state}
                    {order.shipping?.postalCode || order.shippingAddress?.postalCode}
                  </p>
                  <p>{order.shipping?.country || order.shippingAddress?.country || "India"}</p>
                </address>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Payment Information</h3>
                <p className="text-muted-foreground">
                  Payment Method:{" "}
                  <span className="font-medium text-foreground">
                    {order.razorpayPaymentId ? "Razorpay" : order.paymentMethod || "Credit Card"}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Payment Status:{" "}
                  <span className="font-medium text-green-600">
                    {order.razorpayPaymentId
                      ? "Paid"
                      : order.paymentMethod === "cod"
                        ? "Pending (Cash on Delivery)"
                        : "Paid"}
                  </span>
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 bg-gray-50 p-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>A confirmation email has been sent to {order.customerEmail}</p>
              <p className="mt-1">If you have any questions about your order, please contact our customer support.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button variant="outline" className="gap-2" onClick={handlePrintReceipt}>
                <Printer className="h-4 w-4" />
                Print Receipt
              </Button>
              <Button variant="outline" className="gap-2" onClick={handlePrintReceipt}>
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
              <Button className="gap-2 bg-[#1b4332] hover:bg-[#2d6a4f]" onClick={handleSendEmail} disabled={emailSent}>
                <Mail className="h-4 w-4" />
                {emailSent ? "Email Sent!" : "Email Receipt"}
              </Button>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/" className="text-sm font-medium text-[#1b4332] hover:text-[#2d6a4f]">
                Continue Shopping
              </Link>
              <Link href="/order-tracking" className="text-sm font-medium text-[#1b4332] hover:text-[#2d6a4f]">
                Track Order
              </Link>
              <Link href="/contact" className="text-sm font-medium text-[#1b4332] hover:text-[#2d6a4f]">
                Contact Support
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
