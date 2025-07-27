"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductGallery from "@/components/product-gallery"
import NutritionFacts from "@/components/nutrition-facts"
import RelatedProducts from "@/components/related-products"
import ReviewsSection from "@/components/reviews-section"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"

// Nutrition facts data based on actual lab test results from FARELABS
const nutritionFactsData = {
  Unflavored: {
    servingSize: "30g (2 tablespoons)",
    servingsPerContainer: "About 9",
    calories: 174, // 581.03 kcal/100g * 0.3
    totalFat: 12.5, // 41.79 g/100g * 0.3
    saturatedFat: 1.9, // 6.35 g/100g * 0.3
    transFat: 0,
    cholesterol: 1.4, // 4.73 mg/100g * 0.3
    sodium: 31, // 104.4 mg/100g * 0.3
    totalCarbohydrate: 6.8, // 22.59 g/100g * 0.3
    dietaryFiber: 0.6, // 2.00 g/100g * 0.3
    totalSugars: 5.7, // 18.88 g/100g * 0.3
    addedSugars: 0,
    protein: 8.6, // 28.64 g/100g * 0.3
    vitaminD: 0, // ND
    calcium: 58, // 194.45 mg/100g * 0.3
    iron: 3.2, // 10.66 mg/100g * 0.3
    potassium: 171, // 570.84 mg/100g * 0.3
    vitaminA: 34, // 114.23 mcg/100g * 0.3
    vitaminB6: 0.16, // 0.53 mg/100g * 0.3
    vitaminB9: 1.9, // 6.36 mcg/100g * 0.3
    vitaminC: 6.6, // 21.89 mg/100g * 0.3
    vitaminE: 1.2, // 3.87 mg/100g * 0.3
    magnesium: 51, // 169.82 mg/100g * 0.3
    zinc: 1.1, // 3.52 mg/100g * 0.3
    phosphorus: 397, // 1322.08 mg/100g * 0.3
  },
  Chocolate: {
    servingSize: "30g (2 tablespoons)",
    servingsPerContainer: "About 9",
    calories: 174,
    totalFat: 12.5,
    saturatedFat: 1.9,
    transFat: 0,
    cholesterol: 1.4,
    sodium: 31,
    totalCarbohydrate: 6.8,
    dietaryFiber: 0.6,
    totalSugars: 5.7,
    addedSugars: 0,
    protein: 8.6,
    vitaminD: 0,
    calcium: 58,
    iron: 3.2,
    potassium: 171,
    vitaminA: 34,
    vitaminB6: 0.16,
    vitaminB9: 1.9,
    vitaminC: 6.6,
    vitaminE: 1.2,
    magnesium: 51,
    zinc: 1.1,
    phosphorus: 397,
  },
  Strawberry: {
    servingSize: "30g (2 tablespoons)",
    servingsPerContainer: "About 9",
    calories: 174,
    totalFat: 12.5,
    saturatedFat: 1.9,
    transFat: 0,
    cholesterol: 1.4,
    sodium: 31,
    totalCarbohydrate: 6.8,
    dietaryFiber: 0.6,
    totalSugars: 5.7,
    addedSugars: 0,
    protein: 8.6,
    vitaminD: 0,
    calcium: 58,
    iron: 3.2,
    potassium: 171,
    vitaminA: 34,
    vitaminB6: 0.16,
    vitaminB9: 1.9,
    vitaminC: 6.6,
    vitaminE: 1.2,
    magnesium: 51,
    zinc: 1.1,
    phosphorus: 397,
  },
}

export default function ProductDetail({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
  const [quantity, setQuantity] = useState(1)
  const [productReviews, setProductReviews] = useState<any[]>([])
  const { addToCart } = useCart()

  // Load reviews from localStorage using useEffect
  useEffect(() => {
    try {
      const allReviews = JSON.parse(localStorage.getItem("productReviews") || "[]")
      const filteredReviews = allReviews.filter((review: any) => review.productId === product?.id?.toString())
      setProductReviews(filteredReviews)
    } catch (error) {
      console.error("Error loading reviews:", error)
    }
  }, [product?.id]) // Add optional chaining to prevent errors

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: `${product.flavor} Nutripro+`,
      price: product.price,
      quantity: quantity,
      image: product.image_url,
      flavor: product.flavor,
    })
  }

  // Get additional product details based on flavor
  const longDescription =
    product.flavor === "Unflavored"
      ? "Nutra Nexus Unflavored Nutripro+ is crafted from 100% organic ingredients, carefully selected and processed to preserve their natural goodness. Our unique blend combines the nutritional benefits of almonds, dates, cashews, and figs, enhanced with essential B-complex vitamins to support your overall wellbeing.\n\nThis unflavored variant maintains the authentic taste of our premium dry fruits, making it incredibly versatile for various culinary applications. Whether you're boosting your morning smoothie, enhancing your oatmeal, or creating healthy desserts, this powder seamlessly integrates into your recipes without overpowering other flavors."
      : product.flavor === "Chocolate"
        ? "Nutra Nexus Chocolate Nutripro+ brings together the indulgent taste of premium cocoa and the nutritional benefits of our carefully selected organic dry fruits. This delicious blend combines almonds, dates, cashews, and figs with natural cocoa, creating a chocolate experience that's both satisfying and nourishing.\n\nUnlike conventional chocolate products loaded with refined sugars and artificial ingredients, our Chocolate Nutripro+ derives its sweetness naturally from organic dates and figs. Enhanced with B-complex vitamins, this powder supports your energy levels and overall wellbeing while satisfying your chocolate cravings in the healthiest way possible."
        : "Nutra Nexus Strawberry Nutripro+ offers a delightful fusion of refreshing strawberry flavor and the nutritional benefits of our premium organic dry fruits. This vibrant blend combines almonds, dates, cashews, and figs with natural strawberry, creating a fruity experience that's both enjoyable and nourishing.\n\nThe sweet, tangy notes of strawberry perfectly complement the natural sweetness of dates and figs, creating a balanced flavor profile that appeals to both adults and children. Enhanced with B-complex vitamins, this powder supports your energy levels and overall wellbeing while delivering a burst of berry goodness with every serving."

  const ingredients =
    product.flavor === "Unflavored"
      ? [
          "Organic Almond Powder",
          "Organic Date Powder",
          "Organic Cashew Powder",
          "Organic Fig Powder",
          "Vitamin B Complex (B1, B2, B3, B5, B6, B7, B9, B12)",
        ]
      : product.flavor === "Chocolate"
        ? [
            "Organic Almond Powder",
            "Organic Date Powder",
            "Organic Cashew Powder",
            "Organic Fig Powder",
            "Organic Cocoa Powder",
            "Vitamin B Complex (B1, B2, B3, B5, B6, B7, B9, B12)",
          ]
        : [
            "Organic Almond Powder",
            "Organic Date Powder",
            "Organic Cashew Powder",
            "Organic Fig Powder",
            "Natural Strawberry Flavor",
            "Organic Beetroot Powder (for color)",
            "Vitamin B Complex (B1, B2, B3, B5, B6, B7, B9, B12)",
          ]

  const benefits =
    product.flavor === "Unflavored"
      ? [
          "Natural energy boost",
          "Rich in essential nutrients",
          "Supports immune function",
          "Promotes digestive health",
          "Versatile for various recipes",
        ]
      : product.flavor === "Chocolate"
        ? [
            "Natural energy boost",
            "Rich in antioxidants",
            "Supports immune function",
            "Promotes digestive health",
            "Satisfies chocolate cravings healthily",
          ]
        : [
            "Natural energy boost",
            "Rich in antioxidants",
            "Supports immune function",
            "Promotes digestive health",
            "Kid-friendly flavor",
          ]

  const howToUse =
    product.flavor === "Unflavored"
      ? [
          "Add 1-2 tablespoons to your morning smoothie",
          "Mix into yogurt or oatmeal",
          "Blend into protein shakes",
          "Sprinkle over fruit bowls",
          "Incorporate into baking recipes",
        ]
      : product.flavor === "Chocolate"
        ? [
            "Add 1-2 tablespoons to your morning smoothie",
            "Mix into yogurt or oatmeal",
            "Blend into protein shakes",
            "Use in healthy dessert recipes",
            "Mix with warm milk for a nutritious hot chocolate",
          ]
        : [
            "Add 1-2 tablespoons to your morning smoothie",
            "Mix into yogurt or oatmeal",
            "Blend into protein shakes",
            "Use in healthy dessert recipes",
            "Mix with milk for a strawberry milk drink",
          ]

  // Get nutrition facts based on flavor
  const nutritionFacts =
    nutritionFactsData[product.flavor as keyof typeof nutritionFactsData] || nutritionFactsData.Unflavored

  // Get background color based on flavor
  const bgColor = product.flavor === "Unflavored" ? "#d4a373" : product.flavor === "Chocolate" ? "#774936" : "#9c2c2c"

  // Create images array
  const images = Array(4).fill(product.image_url)

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container px-4 py-8 md:px-6">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center text-sm font-medium text-[#1b4332] hover:text-[#d4a373]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <ProductGallery images={images} bgColor={bgColor} />

          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.flavor} Nutripro+</h1>
              <p className="mt-2 text-lg text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#d4a373] text-[#d4a373]" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({productReviews.length || 24} reviews)</span>
              </div>
              <div className="text-sm text-muted-foreground">
                SKU: DF-{product.flavor.substring(0, 3).toUpperCase()}-250
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">In Stock ({product.stock} available)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">Free shipping on orders over ₹1,000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">Lab tested by FARELABS Pvt. Ltd.</span>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Organic</span>
              <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Vegan</span>
              <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">No Additives</span>
              <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Non-GMO</span>
              <span className="rounded-full bg-[#1b4332]/10 px-3 py-1 text-xs text-[#1b4332]">Lab Tested</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex h-10 w-12 items-center justify-center text-sm font-medium">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button className="flex-1 bg-[#1b4332] hover:bg-[#2d6a4f]" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <div className="mt-4">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href={`/write-review/${product.id}`}>Write a Review</Link>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="ingredients"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
            >
              Nutrition Facts
            </TabsTrigger>
            <TabsTrigger
              value="how-to-use"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
            >
              How to Use
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">{longDescription}</p>
              <h3 className="text-lg font-semibold">Benefits</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#2d6a4f]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                At Nutra Nexus, we believe in complete transparency. Here's exactly what goes into our {product.flavor}{" "}
                Nutripro+:
              </p>
              <ul className="grid gap-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#2d6a4f]" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                All ingredients are sourced from certified organic farms. Our product contains no artificial flavors,
                colors, preservatives, or added sugars.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="nutrition" className="mt-6">
            <NutritionFacts nutrition={nutritionFacts} />
          </TabsContent>
          <TabsContent value="how-to-use" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our {product.flavor} Nutripro+ is incredibly versatile and easy to incorporate into your daily routine.
                Here are some suggestions:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {howToUse.map((instruction, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1b4332] text-xs text-white">
                      {index + 1}
                    </div>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Recommended daily intake: 1-2 tablespoons (15-30g) per day. Store in a cool, dry place after opening.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <ReviewsSection productName={product.flavor} productId={product.id.toString()} customReviews={productReviews} />

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <RelatedProducts products={relatedProducts} currentProductId={product.id.toString()} />
        </div>
      </div>
    </main>
  )
}
