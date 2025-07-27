"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Package } from "lucide-react"

interface LowStockItem {
  id: string
  name: string
  currentStock: number
  minThreshold: number
}

export default function LowStockAlerts() {
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - in real implementation, this would fetch from API
    const mockLowStockData: LowStockItem[] = [
      {
        id: "1",
        name: "NutriPro+ Chocolate",
        currentStock: 5,
        minThreshold: 10,
      },
      {
        id: "2", 
        name: "NutriPro+ Unflavored",
        currentStock: 2,
        minThreshold: 10,
      },
    ]

    setTimeout(() => {
      setLowStockItems(mockLowStockData)
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (lowStockItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-500" />
            Stock Status
          </CardTitle>
          <CardDescription>All products are well stocked</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Package className="h-4 w-4" />
            <AlertDescription>
              All products have sufficient stock levels. No immediate action required.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Low Stock Alerts
        </CardTitle>
        <CardDescription>
          Products running low on inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockItems.map((item) => (
            <Alert key={item.id} className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {item.currentStock} left
                  </Badge>
                  <span className="text-sm text-orange-600">
                    (Min: {item.minThreshold})
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 