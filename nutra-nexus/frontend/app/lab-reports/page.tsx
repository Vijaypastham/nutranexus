"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Download, Eye, FileText, FlaskConical, Shield, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"

// Real lab report data from FARELABS
const labReports = {
  nutritional: [
    {
      id: 1,
      title: "Nutritional Analysis Report",
      batchNumber: "N20250619-001-001",
      testDate: "2025-06-19",
      reportDate: "2025-06-24",
      expiryDate: "2025-12-24",
      status: "Verified",
      parameters: [
        { test: "Energy", result: "581.03 kcal/100g", specification: "High Energy Content", status: "Pass" },
        { test: "Protein", result: "28.64 g/100g", specification: "≥25 g/100g", status: "Pass" },
        { test: "Total Fat", result: "41.79 g/100g", specification: "35-45 g/100g", status: "Pass" },
        { test: "Carbohydrates", result: "22.59 g/100g", specification: "20-25 g/100g", status: "Pass" },
        { test: "Dietary Fiber", result: "2.00 g/100g", specification: "≥2 g/100g", status: "Pass" },
        { test: "Total Sugar", result: "18.88 g/100g", specification: "Natural Sugars", status: "Pass" },
        { test: "Cholesterol", result: "4.73 mg/100g", specification: "Low Cholesterol", status: "Pass" },
        { test: "Sodium", result: "104.4 mg/100g", specification: "Low Sodium", status: "Pass" },
      ],
      certificateUrl: "/certificates/nutritional-analysis-N20250619-001-001.pdf",
    },
  ],
  vitamins: [
    {
      id: 2,
      title: "Vitamin Analysis Report",
      batchNumber: "N20250619-001-001",
      testDate: "2025-06-19",
      reportDate: "2025-06-24",
      expiryDate: "2025-12-24",
      status: "Verified",
      parameters: [
        { test: "Vitamin A", result: "114.23 mcg/100g", specification: "≥100 mcg/100g", status: "Pass" },
        { test: "Vitamin B6", result: "0.53 mg/100g", specification: "≥0.5 mg/100g", status: "Pass" },
        { test: "Vitamin B9 (Folic Acid)", result: "6.36 mcg/100g", specification: "≥5 mcg/100g", status: "Pass" },
        { test: "Vitamin C", result: "21.89 mg/100g", specification: "≥20 mg/100g", status: "Pass" },
        { test: "Vitamin E", result: "3.87 mg/100g", specification: "≥3 mg/100g", status: "Pass" },
        { test: "Vitamin D", result: "ND (Not Detected)", specification: "Natural Product", status: "Pass" },
        { test: "Vitamin K", result: "ND (Not Detected)", specification: "Natural Product", status: "Pass" },
      ],
      certificateUrl: "/certificates/vitamin-analysis-N20250619-001-001.pdf",
    },
  ],
  minerals: [
    {
      id: 3,
      title: "Mineral Analysis Report",
      batchNumber: "N20250619-001-001",
      testDate: "2025-06-19",
      reportDate: "2025-06-24",
      expiryDate: "2025-12-24",
      status: "Verified",
      parameters: [
        { test: "Calcium", result: "194.45 mg/100g", specification: "≥150 mg/100g", status: "Pass" },
        { test: "Iron", result: "10.66 mg/100g", specification: "≥8 mg/100g", status: "Pass" },
        { test: "Magnesium", result: "169.82 mg/100g", specification: "≥150 mg/100g", status: "Pass" },
        { test: "Potassium", result: "570.84 mg/100g", specification: "≥500 mg/100g", status: "Pass" },
        { test: "Zinc", result: "3.52 mg/100g", specification: "≥3 mg/100g", status: "Pass" },
        { test: "Phosphorus", result: "1322.08 mg/100g", specification: "≥1000 mg/100g", status: "Pass" },
      ],
      certificateUrl: "/certificates/mineral-analysis-N20250619-001-001.pdf",
    },
  ],
  fattyAcids: [
    {
      id: 4,
      title: "Fatty Acid Profile Analysis",
      batchNumber: "N20250619-001-001",
      testDate: "2025-06-19",
      reportDate: "2025-06-24",
      expiryDate: "2025-12-24",
      status: "Verified",
      parameters: [
        { test: "Saturated Fatty Acid", result: "6.35 g/100g", specification: "Healthy Profile", status: "Pass" },
        { test: "Mono Unsaturated Fatty Acid", result: "15.34 g/100g", specification: "Heart Healthy", status: "Pass" },
        {
          test: "Poly Unsaturated Fatty Acid",
          result: "20.1 g/100g",
          specification: "Essential Fatty Acids",
          status: "Pass",
        },
      ],
      certificateUrl: "/certificates/fatty-acid-analysis-N20250619-001-001.pdf",
    },
  ],
}

export default function LabReportsPage() {
  const [selectedReport, setSelectedReport] = useState<any>(null)

  const handleViewReport = (report: any) => {
    setSelectedReport(report)
  }

  const handleDownload = (certificateUrl: string, title: string) => {
    // In a real implementation, this would trigger a download
    console.log(`Downloading: ${title} from ${certificateUrl}`)
    alert("Certificate download would start here. (Demo only)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Lab Test Certificates & Reports
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Complete transparency through third-party laboratory testing by FARELABS Pvt. Ltd.
            </p>
          </div>
        </div>

        {/* Lab Information */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FlaskConical className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">FARELABS Pvt. Ltd.</CardTitle>
                <CardDescription className="text-lg">Certified Food Testing Laboratory</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">NABL Accredited</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">ISO/IEC 17025:2017</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Every Batch Tested</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">100% Quality Assurance</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Comprehensive Analysis</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Multi-parameter Testing</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <span className="font-semibold">Latest Test Report:</span> June 24, 2025 |
                <span className="font-semibold"> Batch:</span> N20250619-001-001 |
                <span className="font-semibold"> Sample:</span> NutriPro+ (270g Polypack)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reports Tabs */}
        <Tabs defaultValue="nutritional" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="nutritional" className="text-xs sm:text-sm py-2 sm:py-3">
              Nutritional
            </TabsTrigger>
            <TabsTrigger value="vitamins" className="text-xs sm:text-sm py-2 sm:py-3">
              Vitamins
            </TabsTrigger>
            <TabsTrigger value="minerals" className="text-xs sm:text-sm py-2 sm:py-3">
              Minerals
            </TabsTrigger>
            <TabsTrigger value="fattyAcids" className="text-xs sm:text-sm py-2 sm:py-3">
              Fatty Acids
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutritional">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold mb-4">Nutritional Analysis Reports</h2>
              {labReports.nutritional.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                          <span className="break-words">{report.title}</span>
                          <Badge variant="default">{report.status}</Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          <span className="block sm:inline">Batch: {report.batchNumber}</span>
                          <span className="hidden sm:inline"> | </span>
                          <span className="block sm:inline">Test Date: {report.testDate}</span>
                          <span className="hidden sm:inline"> | </span>
                          <span className="block sm:inline">Report Date: {report.reportDate}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto text-xs sm:text-sm bg-transparent"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl break-words">{report.title}</DialogTitle>
                              <DialogDescription className="text-sm">
                                <span className="block sm:inline">Batch: {report.batchNumber}</span>
                                <span className="hidden sm:inline"> | </span>
                                <span className="block sm:inline">Test Date: {report.testDate}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                  <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Parameter</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Result</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                                        Specification
                                      </th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {report.parameters.map((param, index) => (
                                      <tr key={index}>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.test}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.result}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.specification}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                          <Badge
                                            variant={param.status === "Pass" ? "default" : "destructive"}
                                            className="text-xs"
                                          >
                                            {param.status}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="w-full sm:w-auto text-xs sm:text-sm"
                          onClick={() => handleDownload(report.certificateUrl, report.title)}
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Valid until: {report.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">All nutritional claims verified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vitamins">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold mb-4">Vitamin Analysis Reports</h2>
              {labReports.vitamins.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                          <span className="break-words">{report.title}</span>
                          <Badge variant="default">{report.status}</Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          <span className="block sm:inline">Batch: {report.batchNumber}</span>
                          <span className="hidden sm:inline"> | </span>
                          <span className="block sm:inline">Test Date: {report.testDate}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto text-xs sm:text-sm bg-transparent"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl break-words">{report.title}</DialogTitle>
                              <DialogDescription className="text-sm">
                                <span className="block sm:inline">Batch: {report.batchNumber}</span>
                                <span className="hidden sm:inline"> | </span>
                                <span className="block sm:inline">Test Date: {report.testDate}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                  <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Vitamin</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Result</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                                        Specification
                                      </th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {report.parameters.map((param, index) => (
                                      <tr key={index}>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.test}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.result}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.specification}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                          <Badge
                                            variant={param.status === "Pass" ? "default" : "destructive"}
                                            className="text-xs"
                                          >
                                            {param.status}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="w-full sm:w-auto text-xs sm:text-sm"
                          onClick={() => handleDownload(report.certificateUrl, report.title)}
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Valid until: {report.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Vitamin content verified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="minerals">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold mb-4">Mineral Analysis Reports</h2>
              {labReports.minerals.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                          <span className="break-words">{report.title}</span>
                          <Badge variant="default">{report.status}</Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          <span className="block sm:inline">Batch: {report.batchNumber}</span>
                          <span className="hidden sm:inline"> | </span>
                          <span className="block sm:inline">Test Date: {report.testDate}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto text-xs sm:text-sm bg-transparent"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl break-words">{report.title}</DialogTitle>
                              <DialogDescription className="text-sm">
                                <span className="block sm:inline">Batch: {report.batchNumber}</span>
                                <span className="hidden sm:inline"> | </span>
                                <span className="block sm:inline">Test Date: {report.testDate}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                  <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Mineral</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Result</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                                        Specification
                                      </th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {report.parameters.map((param, index) => (
                                      <tr key={index}>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.test}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.result}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.specification}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                          <Badge
                                            variant={param.status === "Pass" ? "default" : "destructive"}
                                            className="text-xs"
                                          >
                                            {param.status}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="w-full sm:w-auto text-xs sm:text-sm"
                          onClick={() => handleDownload(report.certificateUrl, report.title)}
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Valid until: {report.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Mineral content verified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fattyAcids">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold mb-4">Fatty Acid Profile Reports</h2>
              {labReports.fattyAcids.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                          <span className="break-words">{report.title}</span>
                          <Badge variant="default">{report.status}</Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          <span className="block sm:inline">Batch: {report.batchNumber}</span>
                          <span className="hidden sm:inline"> | </span>
                          <span className="block sm:inline">Test Date: {report.testDate}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto text-xs sm:text-sm bg-transparent"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl break-words">{report.title}</DialogTitle>
                              <DialogDescription className="text-sm">
                                <span className="block sm:inline">Batch: {report.batchNumber}</span>
                                <span className="hidden sm:inline"> | </span>
                                <span className="block sm:inline">Test Date: {report.testDate}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                                  <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                                        Fatty Acid Type
                                      </th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Result</th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                                        Specification
                                      </th>
                                      <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {report.parameters.map((param, index) => (
                                      <tr key={index}>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.test}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.result}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 break-words">
                                          {param.specification}
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                          <Badge
                                            variant={param.status === "Pass" ? "default" : "destructive"}
                                            className="text-xs"
                                          >
                                            {param.status}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="w-full sm:w-auto text-xs sm:text-sm"
                          onClick={() => handleDownload(report.certificateUrl, report.title)}
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Valid until: {report.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Healthy fatty acid profile confirmed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Note */}
        <Card className="mt-6 sm:mt-8">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Quality Assurance Commitment</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">
                Every batch of NutriPro+ undergoes comprehensive testing at FARELABS Pvt. Ltd. before reaching you. Our
                commitment to transparency means you can access all test reports and certificates for complete peace of
                mind. All tests are conducted using internationally recognized methods and standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
