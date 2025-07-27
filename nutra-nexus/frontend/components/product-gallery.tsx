"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ProductGalleryProps {
  images: string[]
  bgColor: string
}

export default function ProductGallery({ images, bgColor }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square overflow-hidden rounded-lg flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-full flex items-center justify-center"
        >
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt="Product image"
            width={400}
            height={400}
            className="object-contain h-full w-full"
            priority
          />
        </motion.div>
      </div>
      <div className="flex space-x-2 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square w-20 overflow-hidden rounded-md border-2 flex items-center justify-center ${
              selectedImage === index ? "border-[#1b4332]" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(index)}
            style={{ backgroundColor: bgColor }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="object-contain p-1 max-h-full max-w-full"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
