"use client"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

// Make sure the component accepts and uses currentProductId
export default function RelatedProducts({
  products,
  currentProductId,
}: { products: any[]; currentProductId?: string }) {
  // Filter out the current product if currentProductId is provided
  const filteredProducts = currentProductId
    ? products.filter((product) => product.id.toString() !== currentProductId)
    : products

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.slice(0, 3).map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="group block">
          <div className="overflow-hidden rounded-lg">
            <div className="relative aspect-square bg-[#f0ebe1]">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.flavor}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium">{product.flavor} Dryfruit Fusion</h3>
          <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
        </Link>
      ))}
    </div>
  )
}
