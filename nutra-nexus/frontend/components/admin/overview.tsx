"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice } from "@/lib/utils"
import LowStockAlerts from "./low-stock-alerts"

export default function AdminOverview() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalSales: 0,
    recentOrders: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard/stats")
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1b4332] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Low Stock Alerts - Priority Section */}
      <LowStockAlerts />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(dashboardData.totalSales)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+3 new products this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You have {dashboardData.totalOrders} total orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentOrders && dashboardData.recentOrders.length > 0 ? (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-4 font-medium">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Status</div>
                        <div>Date</div>
                        <div className="text-right">Amount</div>
                      </div>
                      <div className="divide-y">
                        {dashboardData.recentOrders.map((order: any) => {
                          const products =
                            typeof order.products === "string" ? JSON.parse(order.products) : order.products

                          const total = products.reduce(
                            (sum: number, product: any) => sum + Number.parseFloat(product.price) * product.quantity,
                            0,
                          )

                          return (
                            <div key={order.id} className="grid grid-cols-5 p-4">
                              <div className="font-medium">#{order.id}</div>
                              <div className="truncate">{order.customer_name}</div>
                              <div>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    order.status === "delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "shipped"
                                        ? "bg-blue-100 text-blue-800"
                                        : order.status === "cancelled"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                              <div>{new Date(order.created_at).toLocaleDateString()}</div>
                              <div className="text-right">{formatPrice(total)}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <p>No recent orders found.</p>
                  )}
                  <Button asChild variant="outline" size="sm" className="gap-1">
                    <Link href="/admin/dashboard/orders">
                      View all orders
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made {formatPrice(dashboardData.totalSales)} this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 font-medium">
                      <div className="h-2 w-2 rounded-full bg-[#1b4332]" />
                      Unflavored
                    </div>
                    <div className="ml-auto font-medium">{formatPrice(dashboardData.totalSales * 0.4)}</div>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 font-medium">
                      <div className="h-2 w-2 rounded-full bg-[#774936]" />
                      Chocolate
                    </div>
                    <div className="ml-auto font-medium">{formatPrice(dashboardData.totalSales * 0.35)}</div>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 font-medium">
                      <div className="h-2 w-2 rounded-full bg-[#9c2c2c]" />
                      Strawberry
                    </div>
                    <div className="ml-auto font-medium">{formatPrice(dashboardData.totalSales * 0.25)}</div>
                    <ArrowUpRight className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center border rounded-md">
          <div className="text-center">
            <p className="text-muted-foreground">Detailed analytics will be available soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="h-[400px] flex items-center justify-center border rounded-md">
          <div className="text-center">
            <p className="text-muted-foreground">Report generation will be available soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
