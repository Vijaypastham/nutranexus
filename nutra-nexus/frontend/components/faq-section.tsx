"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "What makes NutriPro+ different from other supplements?",
    answer:
      "NutriPro+ is crafted from 13 premium, organic ingredients including sunflower seeds, almonds, kharek, flax seeds, and amla. Unlike synthetic supplements, our blend provides complete nutrition naturally - with proteins, healthy fats, vitamins, minerals, and antioxidants all from whole food sources. No artificial additives, preservatives, or chemicals.",
  },
  {
    question: "Is NutriPro+ suitable for all age groups?",
    answer:
      "Yes! NutriPro+ is safe and beneficial for all ages - from children to seniors. Our natural, organic formula contains no harmful chemicals or artificial additives. However, we recommend consulting with a healthcare provider for children under 2 years or if you have specific medical conditions.",
  },
  {
    question: "How should I consume NutriPro+ for best results?",
    answer:
      "For optimal results, take 1-2 tablespoons (15-30g) daily. You can mix it with milk, yogurt, smoothies, or eat it directly. We recommend taking it in the morning for sustained energy throughout the day, or post-workout for muscle recovery.",
  },
  {
    question: "Why do you only sell on Fridays?",
    answer:
      "We believe in quality over quantity. Our Friday-only sales allow us to maintain small-batch production, ensuring maximum freshness and quality. This approach lets us carefully monitor every step of the process and source the finest ingredients in limited quantities.",
  },
  {
    question: "What are the main health benefits of NutriPro+?",
    answer:
      "NutriPro+ supports immunity, heart health, digestion, energy levels, muscle strength, brain function, and overall vitality. Rich in omega-3 fatty acids, antioxidants, complete proteins, and essential vitamins and minerals, it provides comprehensive nutrition for modern lifestyles.",
  },
  {
    question: "Is NutriPro+ suitable for vegetarians and vegans?",
    answer:
      "NutriPro+ is 100% plant-based and suitable for both vegetarians and vegans. All our ingredients are sourced from organic plants, seeds, nuts, and fruits - no animal products whatsoever.",
  },
  {
    question: "How long does one pack of NutriPro+ last?",
    answer:
      "Each 500g pack lasts approximately 16-33 days, depending on your daily intake (1-2 tablespoons). We recommend consistent daily use for best results and optimal health benefits.",
  },
  {
    question: "Do you offer any guarantees or return policy?",
    answer:
      "Yes! We offer a 30-day satisfaction guarantee. If you're not completely satisfied with NutriPro+, contact us within 30 days of purchase for a full refund. We're confident you'll love the quality and results.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white text-sm font-medium rounded-full shadow-lg">
              Got Questions?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about <span className="font-semibold text-[#1b4332]">NutriPro+</span> and our
            commitment to your health
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-[#1b4332]/5 hover:to-[#2d6a4f]/5 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-[#1b4332]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#1b4332]" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-gray-200 mb-6 max-w-md">
              Our team is here to help you make the best choice for your health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@nutranexus.com"
                className="px-6 py-3 bg-gradient-to-r from-[#F1C889] to-[#e9c46a] hover:from-[#e9c46a] hover:to-[#d4a373] text-[#1b4332] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Email Us
              </a>
              <a
                href="tel:+919876543210"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
