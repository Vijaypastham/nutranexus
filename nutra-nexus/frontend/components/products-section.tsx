"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Shield, Zap, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"

export default function ProductsSection() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data.slice(0, 3))
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#f8f5f0] via-white to-[#f8f5f0]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
              Our Premium Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden shadow-lg">
                <div className="aspect-square w-full animate-pulse bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-6 w-3/4 animate-pulse bg-gray-200 mb-2"></div>
                  <div className="h-4 w-1/2 animate-pulse bg-gray-200 mb-4"></div>
                  <div className="h-10 w-full animate-pulse bg-gray-200"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#f8f5f0] via-white to-[#f8f5f0]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white text-sm font-medium rounded-full shadow-lg">
              Premium Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
            Our Premium Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted range of <span className="font-semibold text-[#1b4332]">NutriPro+</span>{" "}
            flavors, each packed with 13 premium ingredients for complete nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#f0ebe1] to-[#e8dcc0]">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white text-xs font-semibold rounded-full shadow-lg">
                      Premium
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-[#F1C889] fill-current" />
                      <span className="text-xs font-semibold text-gray-700">4.9</span>
                    </div>
                  </div>
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={`${product.flavor} NutriPro+`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6 relative">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1b4332] transition-colors duration-300">
                      {product.flavor} NutriPro+
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-[#1b4332]/10 to-[#2d6a4f]/10 px-3 py-1 rounded-full">
                      <Leaf className="w-3 h-3 text-[#1b4332]" />
                      <span className="text-xs font-medium text-[#1b4332]">Organic</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-[#d4a373]/10 to-[#e9c46a]/10 px-3 py-1 rounded-full">
                      <Shield className="w-3 h-3 text-[#d4a373]" />
                      <span className="text-xs font-medium text-[#d4a373]">No Additives</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-[#3a8a68]/10 to-[#2d6a4f]/10 px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-[#3a8a68]" />
                      <span className="text-xs font-medium text-[#3a8a68]">Energy Boost</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">per 500g</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#3a8a68] text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">13 Premium Ingredients</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] rounded-full"></div>
                        <span className="text-[#1b4332] font-medium">In Stock</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Health?</h3>
            <p className="text-gray-200 mb-6 max-w-md">
              Join thousands who've made NutriPro+ part of their daily wellness routine
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#F1C889] to-[#e9c46a] hover:from-[#e9c46a] hover:to-[#d4a373] text-[#1b4332] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/products">
                Explore All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
