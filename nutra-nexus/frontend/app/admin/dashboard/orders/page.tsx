import OrdersManagement from "@/components/admin/orders-management"

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      <OrdersManagement />
    </div>
  )
}
