import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Nutra Nexus - Premium NutriPro+",
  description: "Elevate your wellness journey with our premium blend of organic dry fruits and essential vitamins.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <Navbar />
            {children}
            <footer className="bg-[#1b4332] dark:bg-gray-900 py-12 text-white">
              <div className="container grid gap-8 px-4 md:grid-cols-4 md:px-6">
                <div className="space-y-3">
                  <h3 className="mb-2 text-lg font-semibold">Nutra Nexus</h3>
                  <p className="text-sm text-gray-300">
                    Premium health and wellness products made with 100% organic ingredients.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300 md:grid-cols-1">
                    <li>
                      <a href="/products" className="hover:text-[#d4a373]">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="hover:text-[#d4a373]">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="hover:text-[#d4a373]">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="/privacy-policy" className="hover:text-[#d4a373]">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/faq" className="hover:text-[#d4a373]">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="mb-2 text-lg font-semibold">Contact Us</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Email: info@nutranexus.com</li>
                    <li>Phone: +91 98765 43210</li>
                    <li>Address: 123 Wellness Way, Mumbai, 400001</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-[#d4a373]">
                      <span className="sr-only">Facebook</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/nutra_nexus?igsh=MW1ha3R5ZmhtMzNyeg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#d4a373]"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-[#d4a373]">
                      <span className="sr-only">Twitter</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-2 text-lg font-semibold">Certifications</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-300">FSSAI Registered:</span>
                      <span className="text-sm font-medium text-white break-all">23625033001877</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
                <p>© {new Date().getFullYear()} Nutra Nexus. All rights reserved.</p>
              </div>
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
