"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Send, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const products = [
  {
    id: "1",
    name: "Unflavored NutriPro+",
    image: "/images/unflavored.jpeg",
  },
  {
    id: "2",
    name: "Chocolate NutriPro+",
    image: "/images/chocolate.jpeg",
  },
  {
    id: "3",
    name: "Strawberry NutriPro+",
    image: "/images/strawberry.jpeg",
  },
]

export default function WriteReviewPage({ params }: { params: { productId: string } }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Find the product
  const product = products.find((p) => p.id === params.productId)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      const reviewData = {
        productId: params.productId,
        name,
        email,
        rating,
        title,
        review,
        date: new Date().toISOString(),
        verified: true,
      }

      console.log("Submitting review:", reviewData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store in localStorage for demo purposes
      const existingReviews = JSON.parse(localStorage.getItem("productReviews") || "[]")
      localStorage.setItem("productReviews", JSON.stringify([...existingReviews, reviewData]))

      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your feedback.",
      })

      // Redirect back to product page
      router.push(`/products/${params.productId}`)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your review. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!product) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center md:px-6">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <p className="mt-4 text-muted-foreground">The product you're looking for doesn't exist.</p>
        <Button asChild className="mt-8 bg-[#1b4332] hover:bg-[#2d6a4f]">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link
          href={`/products/${params.productId}`}
          className="inline-flex items-center text-sm font-medium hover:text-[#d4a373]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Product
        </Link>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>Share your experience with this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <h2 className="text-lg font-medium">{product.name}</h2>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || rating) ? "fill-[#d4a373] text-[#d4a373]" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {rating === 1
                      ? "Poor"
                      : rating === 2
                        ? "Fair"
                        : rating === 3
                          ? "Good"
                          : rating === 4
                            ? "Very Good"
                            : "Excellent"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Review Title</Label>
                <Input
                  id="title"
                  placeholder="Summarize your experience"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="What did you like or dislike about this product?"
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email (not published)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="verified" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="verified" className="text-sm">
                  I confirm this is a genuine product experience
                </Label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={handleSubmitReview}
              className="w-full bg-[#1b4332] hover:bg-[#2d6a4f]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Review
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link href="/privacy-policy" className="text-[#1b4332] hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-[#1b4332] hover:underline">
                Terms of Service
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
