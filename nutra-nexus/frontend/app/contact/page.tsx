"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Instagram, Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setIsSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container px-4 py-12 md:px-6">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-[#d4a373]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight">Contact Us</h1>
          <p className="mb-6 text-muted-foreground">
            We'd love to hear from you! Whether you have a question about our products, need help with an order, or want
            to share your feedback, our team is here to assist you.
          </p>

          <div className="mb-8 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-[#1b4332]" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:organicnutranexus@gmail.com" className="hover:text-[#1b4332]">
                    organicnutranexus@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-[#1b4332]" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[#1b4332]" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">
                  123 Wellness Way
                  <br />
                  Mumbai, 400001
                  <br />
                  India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Instagram className="mt-1 h-5 w-5 text-[#1b4332]" />
              <div>
                <h3 className="font-medium">Instagram</h3>
                <p className="text-muted-foreground">
                  <a
                    href="https://www.instagram.com/nutra_nexus?igsh=MW1ha3R5ZmhtMzNyeg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1b4332]"
                  >
                    @nutra_nexus
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Business Hours</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Monday - Friday</div>
              <div>9:00 AM - 6:00 PM</div>
              <div>Saturday</div>
              <div>10:00 AM - 4:00 PM</div>
              <div>Sunday</div>
              <div>Closed</div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="rounded-lg bg-green-50 p-4 text-green-800">
                  <h3 className="font-medium">Message Sent!</h3>
                  <p className="text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="rounded-lg bg-red-50 p-3 text-red-800 text-sm">{error}</div>}
                  <Button type="submit" className="w-full bg-[#1b4332] hover:bg-[#2d6a4f]" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-8">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=600&width=800" alt="Map" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10">
                      <Image src="/images/logo.png" alt="Nutra Nexus Logo" fill className="object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Nutra Nexus</h3>
                      <p className="text-xs text-muted-foreground">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
