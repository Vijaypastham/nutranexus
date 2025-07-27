export type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  flavor: string
  stock: number
  is_active: boolean
}

export async function getRelatedProducts(currentProductId: number): Promise<Product[]> {
  try {
    const response = await fetch(`/api/products/related/${currentProductId}`)

    if (!response.ok) {
      throw new Error("Failed to fetch related products")
    }

    const data = await response.json()
    return data as Product[]
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}
