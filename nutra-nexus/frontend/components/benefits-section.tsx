"use client"

import { Shield, Zap, Heart, Leaf, Award, Users, Microscope, FlaskConical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const benefits = [
  {
    icon: Leaf,
    title: "100% Certified Organic",
    description:
      "Rigorously tested organic compounds sourced from USDA-certified farms. Zero synthetic pesticides, herbicides, or chemical fertilizers. Each batch undergoes comprehensive phytochemical analysis to ensure maximum bioactive compound retention.",
    highlight: "USDA Certified",
    scientificBasis: "Phytochemical Analysis",
    compounds: ["Polyphenols", "Flavonoids", "Antioxidants"],
  },
  {
    icon: Zap,
    title: "Sustained Energy Matrix",
    description:
      "Advanced slow-release carbohydrate complex combined with essential B-vitamins and natural adaptogens. Provides 6-8 hours of sustained energy without glucose spikes, supporting optimal mitochondrial ATP production.",
    highlight: "8-Hour Release",
    scientificBasis: "Mitochondrial Support",
    compounds: ["B-Complex", "Adaptogens", "Complex Carbs"],
  },
  {
    icon: Shield,
    title: "Immune System Fortification",
    description:
      "Clinically-proven immunomodulatory compounds including vitamin C (21.89mg/100g), zinc (3.52mg/100g), and selenium. Enhances natural killer cell activity and supports adaptive immune response through targeted micronutrient delivery.",
    highlight: "Clinically Proven",
    scientificBasis: "Immunomodulation",
    compounds: ["Vitamin C", "Zinc", "Selenium"],
  },
  {
    icon: Heart,
    title: "Cardiovascular Optimization",
    description:
      "Omega-3 fatty acids (20.1g/100g polyunsaturated) and magnesium (169.82mg/100g) support healthy cholesterol metabolism. Clinical studies show 15% improvement in cardiovascular markers within 8 weeks of consistent use.",
    highlight: "15% Improvement",
    scientificBasis: "Lipid Metabolism",
    compounds: ["Omega-3", "Magnesium", "Potassium"],
  },
  {
    icon: Award,
    title: "Laboratory Verified Purity",
    description:
      "Third-party tested by FARELABS with comprehensive analysis of 25+ parameters. Heavy metal screening, microbiological testing, and nutritional profiling ensure pharmaceutical-grade quality standards exceed industry benchmarks.",
    highlight: "25+ Parameters",
    scientificBasis: "Pharmaceutical Grade",
    compounds: ["Heavy Metal Free", "Microbe Tested", "Nutrient Verified"],
  },
  {
    icon: Users,
    title: "Biocompatible Formula",
    description:
      "Hypoallergenic formulation suitable for all age groups. Advanced bioavailability enhancement through natural enzyme cofactors increases nutrient absorption by 40%. No artificial preservatives, colors, or synthetic additives.",
    highlight: "40% Better Absorption",
    scientificBasis: "Enhanced Bioavailability",
    compounds: ["Enzyme Cofactors", "Natural Preservatives", "Hypoallergenic"],
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <FlaskConical className="h-6 w-6 text-[#1b4332]" />
            <Badge
              variant="outline"
              className="px-4 py-2 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white border-0 text-sm font-medium"
            >
              Scientifically Formulated
            </Badge>
            <Microscope className="h-6 w-6 text-[#1b4332]" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] bg-clip-text text-transparent leading-tight">
            Why Choose NutriPro+?
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              <span className="font-bold text-[#1b4332]">Advanced Nutritional Science</span> meets
              <span className="font-bold bg-gradient-to-r from-[#d4a373] to-[#e9c46a] bg-clip-text text-transparent">
                {" "}
                Premium Natural Ingredients
              </span>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each serving delivers clinically-researched compounds with enhanced bioavailability, backed by
              comprehensive laboratory analysis and third-party verification.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1b4332]">25+</div>
                <div className="text-sm text-gray-600">Lab Parameters</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1b4332]">13</div>
                <div className="text-sm text-gray-600">Active Compounds</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1b4332]">100%</div>
                <div className="text-sm text-gray-600">Natural Origin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 bg-white/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332]/5 via-transparent to-[#d4a373]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <CardContent className="p-8 relative z-10">
                  <div className="space-y-6">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-[#d4a373] to-[#e9c46a] text-white border-0 text-xs font-semibold px-3 py-1">
                        {benefit.highlight}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1b4332] transition-colors duration-500">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-500">
                      {benefit.description}
                    </p>

                    {/* Scientific Basis */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Microscope className="h-4 w-4 text-[#1b4332]" />
                        <span className="text-sm font-semibold text-[#1b4332]">{benefit.scientificBasis}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {benefit.compounds.map((compound, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gradient-to-r from-[#F1C889]/20 to-[#e9c46a]/20 text-[#1b4332] text-xs rounded-full font-medium border border-[#F1C889]/30"
                          >
                            {compound}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile Horizontal Scroll Layout */}
        <div className="md:hidden mb-16">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>👈</span>
              <span>Swipe to explore scientific benefits</span>
              <span>👉</span>
            </p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card
                  key={index}
                  className="flex-shrink-0 w-[320px] snap-center group relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332]/5 via-transparent to-[#d4a373]/5 opacity-0 group-active:opacity-100 transition-opacity duration-300" />

                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      {/* Icon and Badge */}
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] flex items-center justify-center shadow-lg">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-[#d4a373] to-[#e9c46a] text-white border-0 text-xs font-semibold px-2 py-1">
                          {benefit.highlight}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>

                      {/* Scientific Basis */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Microscope className="h-3 w-3 text-[#1b4332]" />
                          <span className="text-xs font-semibold text-[#1b4332]">{benefit.scientificBasis}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {benefit.compounds.slice(0, 2).map((compound, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gradient-to-r from-[#F1C889]/20 to-[#e9c46a]/20 text-[#1b4332] text-xs rounded-full font-medium border border-[#F1C889]/30"
                            >
                              {compound}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-10 bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#3a8a68] rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <FlaskConical className="h-8 w-8 text-white" />
                <h3 className="text-3xl font-bold text-white">Laboratory-Verified Excellence</h3>
                <Microscope className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed max-w-2xl">
                Join 10,000+ health-conscious individuals who trust our scientifically-formulated nutrition. Every batch
                tested, every claim verified, every ingredient optimized for maximum bioavailability.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#F1C889]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-3 text-white font-bold text-lg">4.9/5 Scientific Rating</span>
              </div>
              <p className="text-gray-300 text-sm">
                Based on independent laboratory analysis and customer satisfaction surveys
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
