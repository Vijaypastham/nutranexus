import { notFound } from "next/navigation"
import ProductDetail from "@/components/product-detail"
import { getProductById, getRelatedProducts } from "@/lib/mock-data-service"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const product = getProductById(awaitedParams.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(awaitedParams.id)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
