"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"

// Define the Product type here since we removed the import
export type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  flavor: string
  stock: number
  is_active: boolean
}

export default function ProductShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        // Use the API route instead of the server action
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  if (isLoading) {
    return (
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-24">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
                <div
                  className={`p-6 flex items-center justify-center h-[250px] bg-[${product.flavor === "Unflavored" ? "#d4a373" : product.flavor === "Chocolate" ? "#774936" : "#9c2c2c"}]`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={`Nutripro+ ${product.name}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{product.flavor}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Organic</span>
                    <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Vegan</span>
                    <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">No Additives</span>
                  </div>
                  <div className="mt-4 text-xl font-bold">{formatPrice(product.price)}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-[#1b4332] hover:bg-[#2d6a4f]">
                    <Link href={`/products/${product.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
