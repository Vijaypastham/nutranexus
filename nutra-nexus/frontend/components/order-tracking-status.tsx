"use client"

import { CheckCircle2, Clock, Package, Truck } from "lucide-react"

interface OrderTrackingStatusProps {
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
}

export default function OrderTrackingStatus({ status }: OrderTrackingStatusProps) {
  const steps = [
    { id: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
    { id: "processing", label: "Processing", icon: Clock },
    { id: "shipped", label: "Shipped", icon: Package },
    { id: "delivered", label: "Delivered", icon: Truck },
  ]

  // Map the status to a step index
  const statusToIndex = {
    pending: 0,
    confirmed: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
  }

  const currentStepIndex = statusToIndex[status]

  // If cancelled, show a different UI
  if (status === "cancelled") {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <Clock className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-800">Order Cancelled</h2>
            <p className="text-sm text-red-700">
              This order has been cancelled. Please contact customer support for more information.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6">
      <h3 className="mb-4 text-lg font-semibold">Order Status</h3>
      <div className="relative flex justify-between">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200">
          <div
            className="h-full bg-[#1b4332] transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  isCompleted
                    ? "bg-[#1b4332] text-white"
                    : isCurrent
                      ? "border-2 border-[#1b4332] bg-white text-[#1b4332]"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span
                className={`mt-2 text-center text-xs font-medium ${
                  isCompleted || isCurrent ? "text-[#1b4332]" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
