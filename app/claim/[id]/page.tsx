"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PhotoUpload } from "@/components/photo-upload"
import { AIAssessmentDisplay } from "@/components/ai-assessment-display"
import {
  ArrowLeft,
  Car,
  User,
  Calendar,
  FileText,
  Camera,
  Brain,
  UserCheck,
  CheckCircle,
  Upload,
  Mail,
} from "lucide-react"
import Link from "next/link"

const getClaimData = (id: string) => {
  const baseData = {
    id,
    createdAt: "2024-01-15 13:15",
    updatedAt: "2024-01-15 15:45",
  }

  // Different claim profiles based on ID
  switch (id) {
    case "CLM-2024-001":
      return {
        ...baseData,
        policyNumber: "POL-789456",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.johnson@email.com",
        customerPhone: "(555) 123-4567",
        vehicleInfo: "2022 Honda Accord",
        vehicleYear: "2022",
        vehicleMake: "Honda",
        vehicleModel: "Accord",
        vehicleVin: "1HGCV1F30NA123456",
        incidentDate: "2024-01-15",
        incidentDescription: "Rear-ended at traffic light, damage to front bumper and headlight",
        status: "pending-review",
        priority: "high",
        photos: [
          { id: 1, url: "/damaged-car-front-bumper.png", name: "front-damage-1.jpg", uploadedAt: "2024-01-15 14:30" },
          {
            id: 2,
            url: "/car-headlight-crack-damage.png",
            name: "headlight-damage.jpg",
            uploadedAt: "2024-01-15 14:32",
          },
          { id: 3, url: "/car-license-plate-damage.png", name: "license-plate.jpg", uploadedAt: "2024-01-15 14:35" },
        ],
        aiAssessment: {
          damageType: "Front bumper damage, headlight crack",
          severity: "Moderate",
          estimatedCost: "$2,850",
          confidence: 92,
          processedAt: "2024-01-15 15:45",
          evidenceSources: [
            {
              type: "database",
              source: "CCC Valuescope",
              reference: "Honda Accord 2022 - Front Bumper Assembly",
              confidence: 94,
            },
            {
              type: "manual",
              source: "Mitchell Labor Guide",
              reference: "Body Panel Replacement - Standard",
              confidence: 89,
            },
            {
              type: "database",
              source: "Audatex Parts Catalog",
              reference: "OEM Headlight Assembly - Driver Side",
              confidence: 91,
            },
          ],
          damages: [
            {
              id: 1,
              part: "Front Bumper",
              severity: "Moderate",
              repairType: "Replace",
              laborHours: 3.5,
              partsCost: 450,
              laborCost: 525,
              totalCost: 975,
              confidence: 94,
              evidenceSource: "CCC Valuescope - Honda Accord 2022 Front Bumper Assembly",
              agentStatus: null,
              agentNotes: "",
            },
            {
              id: 2,
              part: "Headlight Assembly (Driver)",
              severity: "Minor",
              repairType: "Replace",
              laborHours: 1.5,
              partsCost: 320,
              laborCost: 225,
              totalCost: 545,
              confidence: 89,
              evidenceSource: "Audatex Parts Catalog - OEM Headlight Assembly",
              agentStatus: null,
              agentNotes: "",
            },
            {
              id: 3,
              part: "Paint Work",
              severity: "Minor",
              repairType: "Touch-up",
              laborHours: 2.0,
              partsCost: 85,
              laborCost: 300,
              totalCost: 385,
              confidence: 91,
              evidenceSource: "Mitchell Labor Guide - Paint & Refinish Standard",
              agentStatus: null,
              agentNotes: "",
            },
          ],
        },
        agentNotes: "",
        approvalStatus: "pending",
      }

    case "CLM-2024-002":
      return {
        ...baseData,
        id: "CLM-2024-002",
        policyNumber: "POL-123789",
        customerName: "Michael Chen",
        customerEmail: "michael.chen@email.com",
        customerPhone: "(555) 987-6543",
        vehicleInfo: "2021 Toyota Camry",
        vehicleYear: "2021",
        vehicleMake: "Toyota",
        vehicleModel: "Camry",
        vehicleVin: "4T1C11AK5MU123456",
        incidentDate: "2024-01-14",
        incidentDescription: "Side-swiped in parking lot, damage to driver side door and mirror",
        status: "awaiting-photos",
        priority: "medium",
        photos: [],
        customerUploadLink: "https://claims.insurancecompany.com/upload/CLM-2024-002",
        agentNotes: "",
        approvalStatus: "pending",
      }

    case "CLM-2024-003":
      return {
        ...baseData,
        id: "CLM-2024-003",
        policyNumber: "POL-456123",
        customerName: "Emily Rodriguez",
        customerEmail: "emily.rodriguez@email.com",
        customerPhone: "(555) 456-7890",
        vehicleInfo: "2023 Ford F-150",
        vehicleYear: "2023",
        vehicleMake: "Ford",
        vehicleModel: "F-150",
        vehicleVin: "1FTFW1E50NFA12345",
        incidentDate: "2024-01-13",
        incidentDescription: "Hail damage to hood and roof, multiple dents",
        status: "ai-in-progress",
        priority: "low",
        photos: [
          { id: 1, url: "/hail-damage-hood.png", name: "hood-damage-1.jpg", uploadedAt: "2024-01-13 16:20" },
          { id: 2, url: "/hail-damage-roof.png", name: "roof-damage-1.jpg", uploadedAt: "2024-01-13 16:22" },
          { id: 3, url: "/hail-damage-close-up.png", name: "damage-closeup.jpg", uploadedAt: "2024-01-13 16:25" },
          { id: 4, url: "/vehicle-overview.png", name: "vehicle-overview.jpg", uploadedAt: "2024-01-13 16:27" },
          { id: 5, url: "/damage-side-view.png", name: "side-view.jpg", uploadedAt: "2024-01-13 16:30" },
        ],
        agentNotes: "",
        approvalStatus: "pending",
      }

    default:
      return {
        ...baseData,
        policyNumber: "POL-789456",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.johnson@email.com",
        customerPhone: "(555) 123-4567",
        vehicleInfo: "2022 Honda Accord",
        vehicleYear: "2022",
        vehicleMake: "Honda",
        vehicleModel: "Accord",
        vehicleVin: "1HGCV1F30NA123456",
        incidentDate: "2024-01-15",
        incidentDescription: "Rear-ended at traffic light, damage to front bumper and headlight",
        status: "pending-review",
        priority: "high",
        photos: [
          { id: 1, url: "/damaged-car-front-bumper.png", name: "front-damage-1.jpg", uploadedAt: "2024-01-15 14:30" },
          {
            id: 2,
            url: "/car-headlight-crack-damage.png",
            name: "headlight-damage.jpg",
            uploadedAt: "2024-01-15 14:32",
          },
          { id: 3, url: "/car-license-plate-damage.png", name: "license-plate.jpg", uploadedAt: "2024-01-15 14:35" },
        ],
        aiAssessment: {
          damageType: "Front bumper damage, headlight crack",
          severity: "Moderate",
          estimatedCost: "$2,850",
          confidence: 92,
          processedAt: "2024-01-15 15:45",
          evidenceSources: [
            {
              type: "database",
              source: "CCC Valuescope",
              reference: "Honda Accord 2022 - Front Bumper Assembly",
              confidence: 94,
            },
            {
              type: "manual",
              source: "Mitchell Labor Guide",
              reference: "Body Panel Replacement - Standard",
              confidence: 89,
            },
            {
              type: "database",
              source: "Audatex Parts Catalog",
              reference: "OEM Headlight Assembly - Driver Side",
              confidence: 91,
            },
          ],
          damages: [
            {
              id: 1,
              part: "Front Bumper",
              severity: "Moderate",
              repairType: "Replace",
              laborHours: 3.5,
              partsCost: 450,
              laborCost: 525,
              totalCost: 975,
              confidence: 94,
              evidenceSource: "CCC Valuescope - Honda Accord 2022 Front Bumper Assembly",
              agentStatus: null,
              agentNotes: "",
            },
            {
              id: 2,
              part: "Headlight Assembly (Driver)",
              severity: "Minor",
              repairType: "Replace",
              laborHours: 1.5,
              partsCost: 320,
              laborCost: 225,
              totalCost: 545,
              confidence: 89,
              evidenceSource: "Audatex Parts Catalog - OEM Headlight Assembly",
              agentStatus: null,
              agentNotes: "",
            },
            {
              id: 3,
              part: "Paint Work",
              severity: "Minor",
              repairType: "Touch-up",
              laborHours: 2.0,
              partsCost: 85,
              laborCost: 300,
              totalCost: 385,
              confidence: 91,
              evidenceSource: "Mitchell Labor Guide - Paint & Refinish Standard",
              agentStatus: null,
              agentNotes: "",
            },
          ],
        },
        agentNotes: "",
        approvalStatus: "pending",
      }
  }
}

export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [claimData, setClaimData] = useState(() => getClaimData(params.id))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "awaiting-photos":
        return "bg-yellow-100 text-yellow-800"
      case "ai-in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending-review":
        return "bg-orange-100 text-orange-800"
      case "pending-approval":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sendPhotoReminder = () => {
    console.log("[v0] Sending photo reminder to customer")
    // Simulate sending reminder
  }

  const copyUploadLink = () => {
    if (claimData.customerUploadLink) {
      navigator.clipboard.writeText(claimData.customerUploadLink)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Car className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Claim {claimData.id}</h1>
              <p className="text-sm text-muted-foreground">
                {claimData.customerName} • {claimData.vehicleInfo}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge className={getPriorityColor(claimData.priority)}>{claimData.priority} priority</Badge>
            <Badge className={getStatusColor(claimData.status)}>{claimData.status.replace("-", " ")}</Badge>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-sidebar min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Claim Overview
            </Button>
            <Button
              variant={activeTab === "photos" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("photos")}
            >
              <Camera className="mr-2 h-4 w-4" />
              {claimData.status === "awaiting-photos" ? "Photo Upload" : "Photos & Upload"}
            </Button>
            {claimData.aiAssessment && (
              <Button
                variant={activeTab === "ai-assessment" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("ai-assessment")}
              >
                <Brain className="mr-2 h-4 w-4" />
                AI Assessment
              </Button>
            )}
            {claimData.aiAssessment && (
              <Button
                variant={activeTab === "agent-review" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("agent-review")}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Agent Review
              </Button>
            )}
            {claimData.aiAssessment && (
              <Button
                variant={activeTab === "confirmation" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("confirmation")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmation
              </Button>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{claimData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{claimData.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{claimData.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Policy:</span>
                      <span>{claimData.policyNumber}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Car className="mr-2 h-5 w-5" />
                      Vehicle Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Year:</span>
                      <span>{claimData.vehicleYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Make:</span>
                      <span>{claimData.vehicleMake}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{claimData.vehicleModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">VIN:</span>
                      <span className="font-mono text-sm">{claimData.vehicleVin}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Incident Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Incident Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{claimData.incidentDate}</span>
                  </div>
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="mt-2 text-muted-foreground">{claimData.incidentDescription}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Status-specific content */}
              {claimData.status === "awaiting-photos" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-yellow-700">
                      <Upload className="mr-2 h-5 w-5" />
                      Awaiting Customer Photos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-yellow-700 mb-4">
                        Customer needs to upload damage photos before AI assessment can begin.
                      </p>
                      {claimData.customerUploadLink && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 p-3 bg-white rounded border">
                            <code className="flex-1 text-sm">{claimData.customerUploadLink}</code>
                            <Button size="sm" variant="outline" onClick={copyUploadLink}>
                              Copy Link
                            </Button>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={sendPhotoReminder}
                              className="bg-yellow-600 text-white hover:bg-yellow-700"
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Reminder
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {claimData.status === "ai-in-progress" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <Brain className="mr-2 h-5 w-5" />
                      AI Processing in Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 mb-4">
                        AI is analyzing {claimData.photos.length} uploaded photos to assess damage and estimate costs.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing Progress</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <p className="text-xs text-blue-600">Estimated completion: 2-3 minutes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick AI Summary */}
              {claimData.aiAssessment && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5" />
                      AI Assessment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{claimData.aiAssessment.estimatedCost}</div>
                        <div className="text-sm text-muted-foreground">Estimated Cost</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{claimData.aiAssessment.confidence}%</div>
                        <div className="text-sm text-muted-foreground">Confidence</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{claimData.photos.length}</div>
                        <div className="text-sm text-muted-foreground">Photos Analyzed</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">{claimData.aiAssessment.damageType}</p>
                      <p className="text-xs text-green-600 mt-1">Severity: {claimData.aiAssessment.severity}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "photos" && (
            <div className="space-y-6">
              {claimData.status === "awaiting-photos" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-yellow-700">
                      <Upload className="mr-2 h-5 w-5" />
                      Customer Photo Upload Required
                    </CardTitle>
                    <CardDescription>Customer must upload damage photos before assessment can begin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 bg-yellow-50 rounded-lg">
                      <Camera className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
                      <h3 className="text-lg font-medium text-yellow-800 mb-2">No Photos Uploaded Yet</h3>
                      <p className="text-yellow-600 mb-6">
                        Customer needs to upload damage photos using the secure link.
                      </p>
                      {claimData.customerUploadLink && (
                        <div className="max-w-md mx-auto space-y-3">
                          <div className="flex items-center space-x-2 p-3 bg-white rounded border">
                            <code className="flex-1 text-sm">{claimData.customerUploadLink}</code>
                            <Button size="sm" variant="outline" onClick={copyUploadLink}>
                              Copy
                            </Button>
                          </div>
                          <Button onClick={sendPhotoReminder} className="bg-yellow-600 text-white hover:bg-yellow-700">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Upload Reminder
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Damage Photos</CardTitle>
                      <CardDescription>Customer-submitted photos of vehicle damage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {claimData.photos.map((photo) => (
                          <div key={photo.id} className="space-y-2">
                            <img
                              src={photo.url || "/placeholder.svg"}
                              alt={photo.name}
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <div className="text-sm">
                              <p className="font-medium">{photo.name}</p>
                              <p className="text-muted-foreground">Uploaded: {photo.uploadedAt}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <PhotoUpload />
                </>
              )}
            </div>
          )}

          {activeTab === "ai-assessment" && claimData.aiAssessment && (
            <AIAssessmentDisplay assessment={claimData.aiAssessment} photos={claimData.photos} />
          )}

          {activeTab === "agent-review" && claimData.aiAssessment && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5" />
                    Agent Review - Streaming Assessment
                  </CardTitle>
                  <CardDescription>Review each AI assessment with evidence. Pass or modify as needed.</CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-6">
                {claimData.aiAssessment.damages.map((damage, index) => (
                  <Card key={damage.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Left side - Photo and AI Analysis */}
                      <div className="bg-gray-50 p-6">
                        <div className="space-y-4">
                          {/* Original Photo */}
                          <div>
                            <h4 className="font-medium mb-2">Original Photo</h4>
                            <img
                              src={claimData.photos[index]?.url || "/placeholder.svg"}
                              alt={`Damage ${index + 1}`}
                              className="w-full h-64 object-cover rounded-lg border"
                            />
                          </div>

                          {/* AI Analysis */}
                          <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-medium mb-3 flex items-center">
                              <Brain className="mr-2 h-4 w-4 text-blue-600" />
                              AI Analysis
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">Part:</span>
                                <span>{damage.part}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Severity:</span>
                                <Badge variant={damage.severity === "Moderate" ? "default" : "secondary"}>
                                  {damage.severity}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Repair Type:</span>
                                <span>{damage.repairType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Confidence:</span>
                                <span className="font-mono">{damage.confidence}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Evidence Source */}
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium mb-2 text-blue-800">Evidence Source</h4>
                            <p className="text-sm text-blue-700">{damage.evidenceSource}</p>
                            <div className="mt-2 text-xs text-blue-600">
                              Database Reference • Confidence: {damage.confidence}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right side - Cost Breakdown and Actions */}
                      <div className="p-6">
                        <div className="space-y-6">
                          {/* Cost Breakdown */}
                          <div>
                            <h4 className="font-medium mb-3">Cost Breakdown</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between p-3 bg-gray-50 rounded">
                                <span>Parts Cost:</span>
                                <span className="font-mono">${damage.partsCost}</span>
                              </div>
                              <div className="flex justify-between p-3 bg-gray-50 rounded">
                                <span>Labor ({damage.laborHours}h):</span>
                                <span className="font-mono">${damage.laborCost}</span>
                              </div>
                              <div className="flex justify-between p-3 bg-primary/10 rounded font-medium">
                                <span>Total:</span>
                                <span className="font-mono text-primary">${damage.totalCost}</span>
                              </div>
                            </div>
                          </div>

                          {/* Agent Actions */}
                          <div className="space-y-4">
                            <h4 className="font-medium">Agent Decision</h4>

                            <div className="grid grid-cols-2 gap-3">
                              <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => {
                                  console.log(`[v0] Passed assessment for ${damage.part}`)
                                  // Update claim data to mark this damage as approved
                                  const updatedData = { ...claimData }
                                  updatedData.aiAssessment.damages[index].agentStatus = "approved"
                                  setClaimData(updatedData)
                                }}
                              >
                                ✓ Pass
                              </Button>
                              <Button
                                variant="outline"
                                className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                                onClick={() => {
                                  console.log(`[v0] Modifying assessment for ${damage.part}`)
                                  // Update claim data to mark this damage as needs modification
                                  const updatedData = { ...claimData }
                                  updatedData.aiAssessment.damages[index].agentStatus = "modifying"
                                  setClaimData(updatedData)
                                }}
                              >
                                ✏️ Modify
                              </Button>
                            </div>

                            {damage.agentStatus === "modifying" && (
                              <div className="space-y-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <h5 className="font-medium text-orange-800">Modify Assessment</h5>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-sm font-medium">Parts Cost</label>
                                    <input
                                      type="number"
                                      defaultValue={damage.partsCost}
                                      className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                                      onChange={(e) => {
                                        const updatedData = { ...claimData }
                                        updatedData.aiAssessment.damages[index].partsCost = Number.parseInt(
                                          e.target.value,
                                        )
                                        updatedData.aiAssessment.damages[index].totalCost =
                                          updatedData.aiAssessment.damages[index].partsCost +
                                          updatedData.aiAssessment.damages[index].laborCost
                                        setClaimData(updatedData)
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Labor Hours</label>
                                    <input
                                      type="number"
                                      step="0.5"
                                      defaultValue={damage.laborHours}
                                      className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                                      onChange={(e) => {
                                        const updatedData = { ...claimData }
                                        updatedData.aiAssessment.damages[index].laborHours = Number.parseFloat(
                                          e.target.value,
                                        )
                                        updatedData.aiAssessment.damages[index].laborCost =
                                          updatedData.aiAssessment.damages[index].laborHours * 150 // $150/hour rate
                                        updatedData.aiAssessment.damages[index].totalCost =
                                          updatedData.aiAssessment.damages[index].partsCost +
                                          updatedData.aiAssessment.damages[index].laborCost
                                        setClaimData(updatedData)
                                      }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Agent Notes</label>
                                  <textarea
                                    placeholder="Explain your modifications..."
                                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                                    rows={3}
                                    onChange={(e) => {
                                      const updatedData = { ...claimData }
                                      updatedData.aiAssessment.damages[index].agentNotes = e.target.value
                                      setClaimData(updatedData)
                                    }}
                                  />
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-orange-600 hover:bg-orange-700 text-white"
                                  onClick={() => {
                                    const updatedData = { ...claimData }
                                    updatedData.aiAssessment.damages[index].agentStatus = "modified"
                                    setClaimData(updatedData)
                                  }}
                                >
                                  Save Modifications
                                </Button>
                              </div>
                            )}

                            {/* Status indicator */}
                            {damage.agentStatus && (
                              <div
                                className={`p-2 rounded text-sm text-center ${
                                  damage.agentStatus === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : damage.agentStatus === "modified"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {damage.agentStatus === "approved"
                                  ? "✓ Approved by Agent"
                                  : damage.agentStatus === "modified"
                                    ? "✏️ Modified by Agent"
                                    : "⏳ Modification in Progress"}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "confirmation" && claimData.aiAssessment && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Final Review & Confirmation
                  </CardTitle>
                  <CardDescription>Review all assessments and send to Senior Adjuster for approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Summary of all damages */}
                    <div>
                      <h4 className="font-medium mb-4">Assessment Summary</h4>
                      <div className="space-y-3">
                        {claimData.aiAssessment.damages.map((damage, index) => (
                          <div key={damage.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <span className="font-medium">{damage.part}</span>
                              <div className="text-sm text-muted-foreground">
                                {damage.repairType} • {damage.severity}
                                {damage.agentStatus && (
                                  <Badge
                                    className="ml-2"
                                    variant={damage.agentStatus === "approved" ? "default" : "secondary"}
                                  >
                                    {damage.agentStatus}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono font-medium">${damage.totalCost}</div>
                              <div className="text-sm text-muted-foreground">{damage.confidence}% confidence</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total cost */}
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Total Estimated Cost:</span>
                        <span className="text-2xl font-bold text-primary font-mono">
                          ${claimData.aiAssessment.damages.reduce((sum, damage) => sum + damage.totalCost, 0)}
                        </span>
                      </div>
                    </div>

                    {/* Agent final notes */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Final Agent Notes</label>
                      <textarea
                        placeholder="Add any final notes for the Senior Adjuster..."
                        className="w-full px-3 py-2 border rounded-md"
                        rows={4}
                        value={claimData.agentNotes}
                        onChange={(e) => {
                          const updatedData = { ...claimData }
                          updatedData.agentNotes = e.target.value
                          setClaimData(updatedData)
                        }}
                      />
                    </div>

                    {/* Send to Senior Adjuster */}
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">Save Draft</Button>
                      <Button
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => {
                          console.log("[v0] Sending claim to Senior Adjuster for approval")
                          const updatedData = { ...claimData }
                          updatedData.status = "pending-approval"
                          setClaimData(updatedData)
                        }}
                      >
                        Send to Senior Adjuster
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
