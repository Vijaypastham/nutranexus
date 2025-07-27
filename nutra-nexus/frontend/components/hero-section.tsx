"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import NotifyMeForm from "./notify-me-form"

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative overflow-hidden bg-[#1b4332] py-16 text-white md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.jpeg"
          alt="Nutra Nexus Dryfruit Fusion"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Nutra Nexus Dryfruit Fusion
            </h1>
            <p className="mt-4 max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Premium dry fruit powder blend for a nutritious and delicious boost to your daily routine.
            </p>
            <p className="mt-4 text-2xl font-semibold text-yellow-300">Launching Soon - Stay Tuned!</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <NotifyMeForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
