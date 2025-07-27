"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample reviews data
const defaultReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "2023-05-15",
    title: "Absolutely love it!",
    content:
      "I've been using this powder for a month now and I can definitely feel the difference in my energy levels. The taste is great and it blends perfectly in my morning smoothie.",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "2023-04-22",
    title: "High quality product",
    content:
      "As a nutrition coach, I'm very particular about what I recommend to my clients. This product has exceeded my expectations in terms of quality and nutritional value.",
    verified: true,
  },
  {
    id: 3,
    name: "Anjali Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    date: "2023-06-03",
    title: "Great for the whole family",
    content:
      "My kids love it mixed with milk! It's so hard to get them to eat healthy, but they actually ask for this. I'm taking off one star only because the packaging could be more eco-friendly.",
    verified: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "2023-05-30",
    title: "Perfect post-workout supplement",
    content:
      "I've tried many supplements over the years, but this one stands out for its clean ingredients and effectiveness. I mix it with my protein shake after workouts and feel great!",
    verified: true,
  },
]

interface ReviewsSectionProps {
  productName: string
  productId: string
  customReviews?: any[]
}

export default function ReviewsSection({ productName, productId, customReviews = [] }: ReviewsSectionProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [isClient, setIsClient] = useState(false)
  const [allReviews, setAllReviews] = useState<any[]>([])

  useEffect(() => {
    setIsClient(true)

    // Combine default reviews with custom reviews
    const combinedReviews = [...defaultReviews, ...customReviews]
    setAllReviews(combinedReviews)
  }, [customReviews])

  const filteredReviews =
    activeTab === "all" ? allReviews : allReviews.filter((review) => review.rating === Number.parseInt(activeTab))

  // Calculate average rating and counts only on the client side
  const averageRating = useMemo(() => {
    if (!isClient || allReviews.length === 0) return 4.8
    return allReviews.reduce((total, review) => total + review.rating, 0) / allReviews.length
  }, [isClient, allReviews])

  const ratingCounts = useMemo(() => {
    if (!isClient) return [3, 1, 0, 0, 0]
    return [5, 4, 3, 2, 1].map((rating) => allReviews.filter((review) => review.rating === rating).length)
  }, [isClient, allReviews])

  const ratingPercentages = useMemo(() => {
    if (!isClient || allReviews.length === 0) return [75, 25, 0, 0, 0]
    return ratingCounts.map((count) => (count / allReviews.length) * 100)
  }, [isClient, allReviews, ratingCounts])

  return (
    <section className="mt-16 py-8">
      <h2 className="mb-8 text-2xl font-bold">Customer Reviews</h2>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="mt-2 flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating) ? "fill-[#d4a373] text-[#d4a373]" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">Based on {allReviews.length} reviews</div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex w-24 items-center">
                  <span className="mr-1">{rating}</span>
                  <Star className="h-4 w-4 fill-[#d4a373] text-[#d4a373]" />
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#d4a373]"
                    style={{ width: `${ratingPercentages[index]}%` }}
                  ></div>
                </div>
                <div className="w-10 text-right text-sm text-muted-foreground">{ratingCounts[index]}</div>
              </div>
            ))}
          </div>

          <Button asChild className="w-full bg-[#1b4332] hover:bg-[#2d6a4f]">
            <Link href={`/write-review/${productId}`}>Write a Review</Link>
          </Button>
        </div>

        <div>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full justify-start border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
              >
                All Reviews
              </TabsTrigger>
              <TabsTrigger
                value="5"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
              >
                5 Star
              </TabsTrigger>
              <TabsTrigger
                value="4"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
              >
                4 Star
              </TabsTrigger>
              <TabsTrigger
                value="3"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
              >
                3 Star
              </TabsTrigger>
              <TabsTrigger
                value="2"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
              >
                2 Star
              </TabsTrigger>
              <TabsTrigger
                value="1"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#1b4332] data-[state=active]:bg-transparent"
              >
                1 Star
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-6">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg border p-6"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">{review.name}</h3>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-[#d4a373] text-[#d4a373]" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <h4 className="mb-2 font-medium">{review.title}</h4>
                      <p className="text-muted-foreground">{review.content}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">No reviews yet</h3>
                    <p className="mt-2 text-muted-foreground">Be the first to review the {productName} NutriPro+</p>
                    <Button asChild className="mt-4 bg-[#1b4332] hover:bg-[#2d6a4f]">
                      <Link href={`/write-review/${productId}`}>Write a Review</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
