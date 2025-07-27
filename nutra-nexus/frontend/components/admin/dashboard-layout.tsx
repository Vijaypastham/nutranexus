"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Box, Home, LogOut, Menu, Package, ShoppingCart, User, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lowStockCount, setLowStockCount] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Calculate low stock items (stock <= 10)
    const lowStockItems = mockProducts.filter((product) => product.stock <= 10 && product.stock > 0)
    setLowStockCount(lowStockItems.length)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/dashboard/products", icon: Package },
    { name: "Customers", href: "/admin/dashboard/customers", icon: User },
    { name: "Analytics", href: "/admin/dashboard/analytics", icon: BarChart3 },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-[#1b4332] pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <Image src="/images/logo.png" alt="Nutra Nexus Logo" fill className="object-contain" />
              </div>
              <span className="text-white text-lg font-semibold">Nutra Nexus</span>
            </div>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const isDashboard = item.name === "Dashboard"
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md relative ${
                      isActive ? "bg-[#2d6a4f] text-white" : "text-gray-100 hover:bg-[#2d6a4f] hover:text-white"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                    {isDashboard && lowStockCount > 0 && (
                      <Badge variant="destructive" className="ml-auto text-xs">
                        {lowStockCount}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="px-2 mt-6 mb-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-white border-white hover:bg-[#2d6a4f] hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-[#1b4332]">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center">
                <div className="relative h-10 w-10 mr-2">
                  <Image src="/images/logo.png" alt="Nutra Nexus Logo" fill className="object-contain" />
                </div>
                <span className="text-white text-lg font-semibold">Nutra Nexus</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto text-white hover:bg-[#2d6a4f]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const isDashboard = item.name === "Dashboard"
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md relative ${
                        isActive ? "bg-[#2d6a4f] text-white" : "text-gray-100 hover:bg-[#2d6a4f] hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                          isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                      {isDashboard && lowStockCount > 0 && (
                        <Badge variant="destructive" className="ml-auto text-xs">
                          {lowStockCount}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="px-2 mt-6 mb-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start text-white border-white hover:bg-[#2d6a4f] hover:text-white"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1b4332]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h1>
              {pathname === "/admin/dashboard" && lowStockCount > 0 && (
                <div className="ml-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-amber-600 font-medium">
                    {lowStockCount} item{lowStockCount > 1 ? "s" : ""} low in stock
                  </span>
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon" className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <Box className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
