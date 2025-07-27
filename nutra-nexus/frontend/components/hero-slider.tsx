"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Bell, Star, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Create Friday Sale Context
const FridaySaleContext = createContext<{
  saleActive: boolean
  countdown: { days: number; hours: number; minutes: number; seconds: number; timeRemaining: number }
}>({
  saleActive: false,
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0, timeRemaining: 0 },
})

export const useFridaySale = () => useContext(FridaySaleContext)

// Updated with real product images
const bannerImages = [
  "/images/hero-banner-1.jpeg",
  "/images/hero-banner-2.jpeg",
  "/images/hero-banner-3.jpeg",
  "/images/hero-banner-4.jpeg",
]

// Same images for mobile - they're already well-composed for mobile viewing
const mobileBannerImages = [
  "/images/hero-banner-1.jpeg",
  "/images/hero-banner-2.jpeg",
  "/images/hero-banner-3.jpeg",
  "/images/hero-banner-4.jpeg",
]

// Function to calculate time until next Friday 12:00 AM
function getTimeUntilNextFriday() {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0 is Sunday, 1 is Monday, ..., 5 is Friday
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5

  const nextFriday = new Date(now)
  nextFriday.setDate(now.getDate() + daysUntilFriday)
  nextFriday.setHours(0, 0, 0, 0) // Set to 12:00 AM

  // If it's Friday and before 12:00 PM, set to today at 12:00 AM
  if (dayOfWeek === 5 && now.getHours() < 12) {
    nextFriday.setDate(now.getDate())
  }

  const timeRemaining = nextFriday.getTime() - now.getTime()

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, timeRemaining }
}

// Function to check if sale is active (Friday between 12:00 AM and 12:00 PM)
function isSaleActive() {
  const now = new Date()
  const dayOfWeek = now.getDay() // 5 is Friday
  const hour = now.getHours()

  return dayOfWeek === 5 && hour < 12
}

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, timeRemaining: 0 })
  const [saleActive, setSaleActive] = useState(false)
  const { toast } = useToast()

  // Update countdown timer every second
  useEffect(() => {
    if (!mounted) return

    const updateCountdown = () => {
      setSaleActive(isSaleActive())
      setCountdown(getTimeUntilNextFriday())
    }

    // Initial update
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [mounted])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  useEffect(() => {
    setMounted(true)
    setIsAutoPlaying(true)
  }, [])

  useEffect(() => {
    if (mounted && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, mounted])

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDialogOpen(false)

      // Show success toast
      toast({
        title: "Thank you for subscribing!",
        description: "We'll notify you when our products launch.",
      })

      // Store in localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]")
      localStorage.setItem("subscribers", JSON.stringify([...subscribers, { name, email }]))

      // Reset form
      setName("")
      setEmail("")
    }, 1500)
  }

  return (
    <FridaySaleContext.Provider value={{ saleActive, countdown }}>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1b4332] to-[#2d6a4f] text-white">
        {/* Desktop Background */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full"
            >
              <Image
                src={bannerImages[currentIndex] || "/placeholder.svg"}
                alt="Nutra Nexus NutriPro+"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Background - Using same high-quality product images */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full"
            >
              <Image
                src={mobileBannerImages[currentIndex] || "/placeholder.svg"}
                alt="Nutra Nexus NutriPro+"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Desktop Layout */}
          <div className="container hidden md:grid md:grid-cols-2 md:gap-6 md:py-24 lg:py-32 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F1C889]/20 px-4 py-2 text-sm text-[#F1C889] w-fit border border-[#F1C889]/30">
                <Award className="h-4 w-4" />
                <span className="font-medium">Premium Nutrition</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    NutriPro+
                  </span>
                </h1>
                <p className="text-2xl font-semibold text-[#F1C889]">13 Premium Dry Fruits • Lab Verified</p>
              </div>

              <p className="text-xl text-gray-200 leading-relaxed max-w-[500px]">
                <span className="font-semibold text-white">28.6g protein per 100g.</span> Scientifically formulated for
                maximum bioavailability and sustained energy.
              </p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#F1C889]" />
                  <span className="text-gray-300">100% Organic</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#F1C889]" />
                  <span className="text-gray-300">FARELABS Tested</span>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#F1C889]/20 to-[#e9c46a]/20 backdrop-blur-sm p-6 border border-[#F1C889]/30 max-w-[400px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 bg-[#F1C889] rounded-full animate-pulse"></div>
                  <p className="font-bold text-[#F1C889] text-lg">LAUNCHING SOON</p>
                </div>
                <p className="text-gray-200 text-sm">Be first to experience premium nutrition</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#F1C889] to-[#e9c46a] hover:from-[#e9c46a] hover:to-[#d4a373] text-[#1b4332] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 w-fit px-8 py-4 text-lg"
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Get Early Access
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] bg-clip-text text-transparent">
                      Get Early Access
                    </DialogTitle>
                    <DialogDescription>
                      Join our exclusive list to be notified when NutriPro+ launches.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleNotifySubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#3a8a68] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Submitting...
                        </>
                      ) : (
                        "Notify Me"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
            <div className="hidden md:flex md:items-center md:justify-center">
              {/* Optional content for right side */}
            </div>
          </div>

          {/* Mobile Layout - Impactful and Concise */}
          <div className="flex min-h-screen items-center justify-center py-8 md:hidden">
            <div className="w-full max-w-[400px] px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center space-y-8 text-center"
              >
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-[#F1C889] border border-[#F1C889]/30"
                >
                  <Award className="h-4 w-4" />
                  Premium Quality
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-4"
                >
                  <h1 className="text-5xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      NutriPro+
                    </span>
                  </h1>
                  <p className="text-xl font-semibold text-[#F1C889]">28.6g Protein • Lab Verified</p>
                </motion.div>

                {/* Key Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-gray-200 text-lg leading-relaxed max-w-[320px]"
                >
                  13 premium dry fruits scientifically formulated for maximum nutrition and sustained energy.
                </motion.p>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="flex items-center justify-center gap-6 text-sm text-gray-300"
                >
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-[#F1C889]" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-[#F1C889]" />
                    <span>Lab Tested</span>
                  </div>
                </motion.div>

                {/* Launch Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="rounded-2xl bg-gradient-to-r from-[#F1C889]/20 to-[#e9c46a]/20 backdrop-blur-sm p-6 border border-[#F1C889]/30 w-full max-w-[320px]"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-2 w-2 bg-[#F1C889] rounded-full animate-pulse"></div>
                    <p className="font-semibold text-[#F1C889] text-lg">LAUNCHING SOON</p>
                  </div>
                  <p className="text-sm text-gray-200">Be first to experience premium nutrition</p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="w-full max-w-[280px]"
                >
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#F1C889] to-[#e9c46a] hover:from-[#e9c46a] hover:to-[#d4a373] text-[#1b4332] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 py-4 text-lg rounded-xl"
                      >
                        <Bell className="mr-2 h-5 w-5" />
                        Get Early Access
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] mx-4 rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] bg-clip-text text-transparent text-xl">
                          Get Early Access
                        </DialogTitle>
                        <DialogDescription className="text-base">
                          Join our exclusive list to be notified when NutriPro+ launches.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleNotifySubmit} className="space-y-6 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name-mobile" className="text-base font-medium">
                            Name
                          </Label>
                          <Input
                            id="name-mobile"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            required
                            className="h-12 text-base rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-mobile" className="text-base font-medium">
                            Email
                          </Label>
                          <Input
                            id="email-mobile"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="h-12 text-base rounded-xl"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#3a8a68] text-white font-semibold text-base rounded-xl"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Submitting...
                            </>
                          ) : (
                            "Notify Me When Available"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Desktop Only */}
        {mounted && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-all hover:bg-white/20 md:flex border border-white/20"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-all hover:bg-white/20 md:flex border border-white/20"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-[#F1C889] shadow-lg" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </FridaySaleContext.Provider>
  )
}
