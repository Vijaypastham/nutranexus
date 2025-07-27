import OrderDetail from "@/components/admin/order-detail"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetail orderId={params.id} />
}
