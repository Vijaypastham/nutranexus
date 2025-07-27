import { NextResponse } from "next/server"

// Mock product data
const products = [
  {
    id: 1,
    name: "Nutra Nexus Protein Powder",
    description: "Premium plant-based protein powder with essential nutrients",
    price: 2499,
    image_url: "/images/unflavored.jpeg",
    flavor: "Unflavored",
    stock: 100,
    is_active: true,
  },
  {
    id: 2,
    name: "Nutra Nexus Protein Powder",
    description: "Premium plant-based protein powder with essential nutrients",
    price: 2499,
    image_url: "/images/chocolate.jpeg",
    flavor: "Chocolate",
    stock: 75,
    is_active: true,
  },
  {
    id: 3,
    name: "Nutra Nexus Protein Powder",
    description: "Premium plant-based protein powder with essential nutrients",
    price: 2499,
    image_url: "/images/strawberry.jpeg",
    flavor: "Strawberry",
    stock: 50,
    is_active: true,
  },
]

export async function GET() {
  // Simulate a delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(products)
}
