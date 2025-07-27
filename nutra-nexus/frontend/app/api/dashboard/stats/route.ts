import { NextResponse } from "next/server"
import { dataService } from "@/lib/data-service"

export async function GET() {
  try {
    const stats = await dataService.getDashboardStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
