"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Send } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function StockAlertSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [lowStockThreshold, setLowStockThreshold] = useState(10)
  const [criticalStockThreshold, setCriticalStockThreshold] = useState(5)
  const [alertFrequency, setAlertFrequency] = useState(24)
  const [adminEmail, setAdminEmail] = useState("admin@nutranexus.com")
  const [additionalEmails, setAdditionalEmails] = useState("")
  const [testEmailSending, setTestEmailSending] = useState(false)

  const handleSaveSettings = () => {
    // In a real application, this would save to a database or API
    toast({
      title: "Settings saved",
      description: "Your stock alert settings have been updated successfully.",
    })
  }

  const handleSendTestEmail = async () => {
    setTestEmailSending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTestEmailSending(false)
    toast({
      title: "Test email sent",
      description: `A test stock alert email has been sent to ${adminEmail}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Stock Alert Settings
        </CardTitle>
        <CardDescription>Configure when and how you receive notifications about low stock levels.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="thresholds">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
          </TabsList>

          <TabsContent value="thresholds" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="low-stock">Low Stock Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="low-stock"
                  type="number"
                  min="1"
                  max="100"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                />
                <span className="text-sm text-muted-foreground">units</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Products with stock at or below this level will trigger a low stock alert.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="critical-stock">Critical Stock Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="critical-stock"
                  type="number"
                  min="0"
                  max="50"
                  value={criticalStockThreshold}
                  onChange={(e) => setCriticalStockThreshold(Number(e.target.value))}
                />
                <span className="text-sm text-muted-foreground">units</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Products with stock at or below this level will trigger an urgent stock alert.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-alerts" className="flex flex-col space-y-1">
                <span>Email Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive email notifications when stock levels are low
                </span>
              </Label>
              <Switch id="email-alerts" checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert-frequency">Alert Frequency</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="alert-frequency"
                  type="number"
                  min="1"
                  max="168"
                  value={alertFrequency}
                  onChange={(e) => setAlertFrequency(Number(e.target.value))}
                  disabled={!emailAlerts}
                />
                <span className="text-sm text-muted-foreground">hours</span>
              </div>
              <p className="text-sm text-muted-foreground">
                How often to send repeated alerts for the same low stock items.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Primary Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                disabled={!emailAlerts}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-emails">Additional Recipients</Label>
              <Input
                id="additional-emails"
                placeholder="email1@example.com, email2@example.com"
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                disabled={!emailAlerts}
              />
              <p className="text-sm text-muted-foreground">Separate multiple email addresses with commas.</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleSendTestEmail}
              disabled={!emailAlerts || testEmailSending}
            >
              {testEmailSending ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test Email
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </CardFooter>
    </Card>
  )
}
