"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fitness Enthusiast",
    content:
      "I've tried many health supplements, but Dryfruit Fusion stands out for its natural ingredients and amazing taste. It's now a staple in my morning routine!",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Nutrition Coach",
    content:
      "As a nutrition coach, I'm very particular about what I recommend to my clients. Nutra Nexus's Dryfruit Fusion is one of the few products I wholeheartedly endorse.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Busy Mom",
    content:
      "The Chocolate flavor is a hit with my kids! I love that I can give them something nutritious that they actually enjoy. It's a win-win for our family.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
]

export default function TestimonialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-[#1b4332] sm:text-4xl md:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Don't just take our word for it. Here's what people are saying about Dryfruit Fusion.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#d4a373] text-[#d4a373]" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="h-4 w-4 text-gray-300" />
                ))}
              </div>
              <p className="flex-1 text-muted-foreground">{testimonial.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
