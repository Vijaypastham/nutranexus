import HeroSlider from "@/components/hero-slider"
import BenefitsSection from "@/components/benefits-section"
import TestimonialSection from "@/components/testimonial-section"
import ProductsSection from "@/components/products-section"
import ComparisonTable from "@/components/comparison-table"
import FAQSection from "@/components/faq-section"
import CertificationSection from "@/components/certification-section"

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ProductsSection />
      <BenefitsSection />
      <ComparisonTable />
      <CertificationSection />
      <TestimonialSection />
      <FAQSection />
    </main>
  )
}
