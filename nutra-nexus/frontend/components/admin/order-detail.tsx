"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function OrderDetail({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/${orderId}`)

        if (!response.ok) {
          if (response.status === 404) {
            router.push("/admin/dashboard/orders")
            return
          }
          throw new Error("Failed to fetch order")
        }

        const data = await response.json()
        setOrder(data)
        setStatus(data.status)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setStatus(newStatus)

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Update the order in state
      setOrder({ ...order, status: newStatus })
    } catch (error) {
      console.error("Error updating order status:", error)
      // Revert status on error
      setStatus(order.status)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1b4332] border-t-transparent"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Order not found</h1>
        <p className="mb-4">The order you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/admin/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>
    )
  }

  const products = typeof order.products === "string" ? JSON.parse(order.products) : order.products
  const total = products.reduce(
    (sum: number, product: any) => sum + Number.parseFloat(product.price) * product.quantity,
    0,
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order #{order.id}</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p>{new Date(order.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="capitalize">{order.status}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p>{order.customer_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{order.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{order.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p>
              {order.address}, {order.city}, {order.state}, {order.postal_code}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">₹{Number.parseFloat(product.price).toFixed(2)}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">₹{(Number.parseFloat(product.price) * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="px-4 py-2 text-right font-semibold">
                  Total
                </td>
                <td className="px-4 py-2 font-semibold">₹{total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {order.notes && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-gray-700">{order.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  )
}
