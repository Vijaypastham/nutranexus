import type { Metadata } from "next"
import StockAlertSettings from "@/components/admin/stock-alert-settings"

export const metadata: Metadata = {
  title: "Stock Alert Settings | Nutra Nexus Admin",
  description: "Configure stock alert settings for your inventory",
}

export default function StockAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stock Alert Settings</h1>
        <p className="text-muted-foreground">
          Configure when and how you receive notifications about low stock levels.
        </p>
      </div>
      <div className="grid gap-6">
        <StockAlertSettings />
      </div>
    </div>
  )
}
