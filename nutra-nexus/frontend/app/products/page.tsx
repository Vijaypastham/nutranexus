import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { getAllProducts } from "@/lib/mock-data-service"

export default function ProductsPage() {
  const products = getAllProducts()

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-[#1b4332] py-12 text-white md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner-1.jpeg"
            alt="Nutra Nexus NutriPro+"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Our Products</h1>
            <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our range of premium NutriPro+ flavors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12">
            {products.map((product: any, index: number) => {
              // Define features based on flavor
              const features =
                product.flavor === "Unflavored"
                  ? [
                      "100% Organic Ingredients",
                      "No Added Sugar",
                      "Rich in Vitamins & Minerals",
                      "Perfect Natural Taste",
                    ]
                  : product.flavor === "Chocolate"
                    ? ["100% Organic Ingredients", "Natural Cocoa Flavor", "Rich in Antioxidants", "Kid-Friendly Taste"]
                    : [
                        "100% Organic Ingredients",
                        "Natural Strawberry Flavor",
                        "Rich in Vitamin C",
                        "Refreshing Fruity Taste",
                      ]

              // Define background color based on flavor
              const bgColor =
                product.flavor === "Unflavored"
                  ? "bg-[#d4a373]"
                  : product.flavor === "Chocolate"
                    ? "bg-[#774936]"
                    : "bg-[#9c2c2c]"

              return (
                <div
                  key={product.id}
                  className={`grid gap-6 rounded-lg p-6 md:grid-cols-2 md:gap-12 ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex items-center justify-center ${bgColor} rounded-lg p-0 h-[400px]`}>
                    <div className="relative h-[90%] w-[90%]">
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={`${product.flavor} NutriPro+`}
                        fill
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter">{product.flavor}</h2>
                    <p className="text-muted-foreground">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Organic</span>
                      <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Vegan</span>
                      <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">
                        No Additives
                      </span>
                    </div>
                    <ul className="grid gap-2">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-[#2d6a4f]"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
                      <Button asChild className="bg-[#1b4332] hover:bg-[#2d6a4f]">
                        <Link href={`/products/${product.id}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
