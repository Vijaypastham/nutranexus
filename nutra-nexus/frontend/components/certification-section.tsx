import { Shield, CheckCircle, Award, FlaskConical } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CertificationSection() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-block rounded-lg bg-amber-100/30 px-3 py-1 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mb-4">
            <Shield className="mr-1 inline-block h-4 w-4" />
            Certified Quality & Lab Tested
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Quality & Safety Assured</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Our products are certified by FSSAI and rigorously tested in accredited laboratories to ensure the highest
            standards of quality, purity, and safety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* FSSAI Certification */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-[#1b4332] dark:text-[#3a8a68]" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">FSSAI Certified</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">FSSAI License Number</p>
                  <p className="text-muted-foreground break-words">23625033001877</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">License Category</p>
                  <p className="text-muted-foreground">Registration [Telangana]</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">Business Type</p>
                  <p className="text-muted-foreground">Trade/Retail - Direct Seller</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">Issue Date</p>
                  <p className="text-muted-foreground">03-05-2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Testing */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <FlaskConical className="h-10 w-10 text-[#1b4332] dark:text-[#3a8a68]" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Laboratory Tested</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">Testing Laboratory</p>
                  <p className="text-muted-foreground">FARELABS Pvt. Ltd.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">Lab Specialization</p>
                  <p className="text-muted-foreground">Water & Food Testing Lab</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">Testing Parameters</p>
                  <p className="text-muted-foreground">Microbiological & Chemical Analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <div>
                  <p className="font-medium">Test Frequency</p>
                  <p className="text-muted-foreground">Every Production Batch</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto">
          {/* What is FSSAI */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">What is FSSAI?</h3>
            <p className="text-muted-foreground">
              The Food Safety and Standards Authority of India (FSSAI) is a statutory body established under the
              Ministry of Health & Family Welfare, Government of India. It is responsible for protecting and promoting
              public health through the regulation and supervision of food safety.
            </p>
          </div>

          {/* Lab Testing Benefits */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Why Lab Testing Matters</h3>
            <p className="text-muted-foreground mb-4">Our rigorous lab testing ensures:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <span>Absence of harmful microorganisms</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <span>Verification of nutritional content</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <span>Detection of contaminants and adulterants</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d6a4f] dark:text-[#3a8a68]" />
                <span>Compliance with food safety standards</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="bg-green-50 dark:bg-gray-800/50 p-6 rounded-lg border border-green-100 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-[#1b4332] dark:text-white">
              Third-Party Laboratory Verification
            </h3>
            <p className="text-[#2d6a4f] dark:text-gray-200 mb-4">
              Every batch of Nutripro+ undergoes comprehensive testing at AR Clean Enviro Labs, an independent
              third-party laboratory specializing in food safety analysis. This ensures unbiased verification of our
              product quality and safety standards.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FlaskConical className="h-4 w-4 text-[#1b4332] dark:text-[#3a8a68]" />
                <span className="text-[#2d6a4f] dark:text-gray-300">Microbiological Testing</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FlaskConical className="h-4 w-4 text-[#1b4332] dark:text-[#3a8a68]" />
                <span className="text-[#2d6a4f] dark:text-gray-300">Chemical Analysis</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FlaskConical className="h-4 w-4 text-[#1b4332] dark:text-[#3a8a68]" />
                <span className="text-[#2d6a4f] dark:text-gray-300">Nutritional Verification</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FlaskConical className="h-4 w-4 text-[#1b4332] dark:text-[#3a8a68]" />
                <span className="text-[#2d6a4f] dark:text-gray-300">Contaminant Screening</span>
              </div>
            </div>
            <Link href="/lab-reports">
              <Button className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white">
                <FlaskConical className="mr-2 h-4 w-4" />
                View All Lab Reports & Certificates
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            You can verify our FSSAI certification on the official FSSAI website:{" "}
            <a
              href="https://foscos.fssai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1b4332] hover:underline dark:text-[#3a8a68] break-words"
            >
              https://foscos.fssai.gov.in
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
