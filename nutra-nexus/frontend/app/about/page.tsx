"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Leaf, Award, Shield, Heart, CheckCircle } from "lucide-react"
import EmbeddedCheckoutForm from "@/components/embedded-checkout-form"

export default function AboutPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-[#2d6a4f]" />,
      title: "100% Natural",
      description: "Pure ingredients sourced directly from nature with no artificial additives or preservatives.",
    },
    {
      icon: <Award className="h-8 w-8 text-[#d4a373]" />,
      title: "Premium Quality",
      description: "Every batch is carefully crafted and tested to meet the highest quality standards.",
    },
    {
      icon: <Shield className="h-8 w-8 text-[#1b4332]" />,
      title: "Lab Verified",
      description: "Third-party tested and certified by FARELABS for purity and potency.",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#e9c46a]" />,
      title: "Health First",
      description: "Formulated by nutrition experts to support your overall health and wellness journey.",
    },
  ]

  const milestones = [
    { year: "2020", title: "Founded", description: "Started with a vision to make premium nutrition accessible" },
    { year: "2021", title: "First Product", description: "Launched NutriPro+ after 18 months of research" },
    { year: "2022", title: "Lab Certification", description: "Achieved FARELABS certification for all products" },
    { year: "2023", title: "10K+ Customers", description: "Reached milestone of serving 10,000+ satisfied customers" },
    { year: "2024", title: "Expansion", description: "Launched new flavors and expanded product line" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332]/5 via-transparent to-[#2d6a4f]/5"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white px-4 py-2 text-sm font-medium">
                  Our Story
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
                    Nutra Nexus
                  </span>
                  <br />
                  <span className="text-gray-900">Where Nature Meets Science</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Born from a passion for authentic nutrition, we bridge the gap between traditional wisdom and modern
                  science to create supplements that truly nourish your body.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#3a8a68] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/products">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-[#d4a373] hover:bg-[#e9c46a] text-[#1b4332] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Get Started Today <Users className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/20 to-[#2d6a4f]/20 rounded-3xl blur-3xl"></div>
              <Image
                src="/images/banner.jpeg"
                alt="NutriPro+ Products"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
                Our Journey to Pure Nutrition
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every great product has a story. Ours began with a simple question: Why compromise on nutrition when
                nature provides everything we need?
              </p>
            </div>

            <div className="grid gap-8 md:gap-12">
              <Card className="p-8 md:p-12 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-0">
                  <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div className="space-y-6">
                      <div className="inline-block p-3 bg-gradient-to-r from-[#1b4332]/10 to-[#2d6a4f]/10 rounded-2xl">
                        <Leaf className="h-8 w-8 text-[#2d6a4f]" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">The Problem We Discovered</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        After years of research, our founders realized that most supplements on the market were filled
                        with synthetic ingredients, artificial flavors, and unnecessary additives. People deserved
                        better – they deserved nutrition that came directly from nature's bounty.
                      </p>
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/unflavored.jpeg"
                        alt="Natural Ingredients"
                        width={400}
                        height={300}
                        className="rounded-2xl shadow-lg object-cover w-full h-[300px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 md:p-12 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-0">
                  <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <Image
                        src="/images/chocolate.jpeg"
                        alt="Premium Quality"
                        width={400}
                        height={300}
                        className="rounded-2xl shadow-lg object-cover w-full h-[300px]"
                      />
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                      <div className="inline-block p-3 bg-gradient-to-r from-[#d4a373]/10 to-[#e9c46a]/10 rounded-2xl">
                        <Award className="h-8 w-8 text-[#d4a373]" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Solution: NutriPro+</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        We spent 18 months perfecting our formula, combining 13 premium dry fruits with essential
                        vitamins and minerals. Every ingredient is carefully sourced, tested, and blended to create a
                        supplement that your body recognizes and absorbs naturally.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#1b4332]/5 via-transparent to-[#2d6a4f]/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do, from sourcing ingredients to serving our customers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-0 text-center space-y-4">
                  <div className="inline-block p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From a small idea to serving thousands of customers, here's how we've grown
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] transform md:-translate-x-0.5"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] rounded-full transform md:-translate-x-1.5 z-10"></div>

                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                      <Card className="ml-12 md:ml-0 p-6 shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-4 mb-3">
                            <Badge className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white px-3 py-1 text-sm font-bold">
                              {milestone.year}
                            </Badge>
                            <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#1b4332]/5 via-transparent to-[#2d6a4f]/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
              Our Promise to You
            </h2>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-[#2d6a4f] flex-shrink-0" />
                <span className="font-semibold text-gray-900">100% Natural Ingredients</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-[#2d6a4f] flex-shrink-0" />
                <span className="font-semibold text-gray-900">Lab Tested & Certified</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-[#2d6a4f] flex-shrink-0" />
                <span className="font-semibold text-gray-900">Money-Back Guarantee</span>
              </div>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're not just another supplement company. We're your partners in health, committed to providing you with
              the purest, most effective nutrition possible. Every product we create is a testament to our dedication to
              your wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] hover:from-[#2d6a4f] hover:to-[#3a8a68] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-[#d4a373] hover:bg-[#e9c46a] text-[#1b4332] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Get Started Today <Users className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Checkout Form */}
      <EmbeddedCheckoutForm isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  )
}
