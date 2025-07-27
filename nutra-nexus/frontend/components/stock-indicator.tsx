import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

type StockIndicatorProps = {
  stock: number
  showExact?: boolean
  className?: string
}

export function StockIndicator({ stock, showExact = false, className = "" }: StockIndicatorProps) {
  // Define stock levels
  const isOutOfStock = stock <= 0
  const isLowStock = stock > 0 && stock <= 10
  const isMediumStock = stock > 10 && stock <= 25
  const isHighStock = stock > 25

  // Get appropriate text based on stock level
  const stockText = isOutOfStock
    ? "Out of Stock"
    : isLowStock
      ? showExact
        ? `Only ${stock} left`
        : "Low Stock"
      : isMediumStock
        ? showExact
          ? `${stock} in stock`
          : "In Stock"
        : "In Stock"

  // Get appropriate color based on stock level
  const bgColor = isOutOfStock
    ? "bg-red-100 text-red-800"
    : isLowStock
      ? "bg-amber-100 text-amber-800"
      : "bg-green-100 text-green-800"

  // Get appropriate icon based on stock level
  const Icon = isOutOfStock ? XCircle : isLowStock ? AlertCircle : CheckCircle2

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor}`}>
        <Icon className="mr-1 h-3.5 w-3.5" />
        {stockText}
      </span>
    </div>
  )
}
