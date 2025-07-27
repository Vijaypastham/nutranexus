"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminDashboardLayout from "@/components/admin/dashboard-layout"
import ProductsManagement from "@/components/admin/products-management"

export default function AdminProductsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const adminAuthenticated = localStorage.getItem("adminAuthenticated")

    if (adminAuthenticated !== "true") {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1b4332] border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <AdminDashboardLayout>
      <ProductsManagement />
    </AdminDashboardLayout>
  )
}
