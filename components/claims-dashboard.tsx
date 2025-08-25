"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { NewClaimModal } from "./new-claim-modal"
import { FileText, Camera, Clock, CheckCircle, AlertCircle, Car, Plus, Brain, UserCheck } from "lucide-react"
import Link from "next/link"

const initialMockClaims = [
  {
    id: "CLM-2024-001",
    policyNumber: "POL-789456",
    customerName: "Sarah Johnson",
    vehicleInfo: "2022 Honda Accord",
    incidentDate: "2024-01-15",
    status: "pending-review",
    aiAssessment: {
      damageType: "Front bumper damage, headlight crack",
      severity: "Moderate",
      estimatedCost: "$2,850",
      confidence: 92,
    },
    photos: 3,
    priority: "high",
  },
  {
    id: "CLM-2024-002",
    policyNumber: "POL-123789",
    customerName: "Michael Chen",
    vehicleInfo: "2021 Toyota Camry",
    incidentDate: "2024-01-14",
    status: "awaiting-photos",
    photos: 0,
    priority: "medium",
  },
  {
    id: "CLM-2024-003",
    policyNumber: "POL-456123",
    customerName: "Emily Rodriguez",
    vehicleInfo: "2023 Ford F-150",
    incidentDate: "2024-01-13",
    status: "ai-in-progress",
    photos: 5,
    priority: "low",
  },
  {
    id: "CLM-2024-004",
    policyNumber: "POL-987654",
    customerName: "David Kim",
    vehicleInfo: "2020 BMW X5",
    incidentDate: "2024-01-12",
    status: "pending-approval",
    aiAssessment: {
      damageType: "Rear quarter panel damage, taillight replacement",
      severity: "Major",
      estimatedCost: "$4,200",
      confidence: 89,
    },
    photos: 7,
    priority: "high",
  },
  {
    id: "CLM-2024-005",
    policyNumber: "POL-555888",
    customerName: "Lisa Thompson",
    vehicleInfo: "2019 Subaru Outback",
    incidentDate: "2024-01-11",
    status: "completed",
    aiAssessment: {
      damageType: "Side mirror replacement, door scratch",
      severity: "Minor",
      estimatedCost: "$650",
      confidence: 95,
    },
    photos: 4,
    priority: "low",
  },
  {
    id: "CLM-2024-006",
    policyNumber: "POL-777999",
    customerName: "Robert Martinez",
    vehicleInfo: "2022 Chevrolet Silverado",
    incidentDate: "2024-01-16",
    status: "awaiting-photos",
    photos: 0,
    priority: "medium",
  },
]

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "awaiting-photos":
      return <Camera className="h-4 w-4" />
    case "ai-in-progress":
      return <Brain className="h-4 w-4" />
    case "pending-review":
      return <Clock className="h-4 w-4" />
    case "pending-approval":
      return <UserCheck className="h-4 w-4" />
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
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

export function ClaimsDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false)
  const [claims, setClaims] = useState(initialMockClaims)

  const handleNewClaim = (newClaim: any) => {
    const claimWithId = {
      ...newClaim,
      id: `CLM-2024-${String(claims.length + 1).padStart(3, "0")}`,
      status: "awaiting-photos",
      photos: 0,
      priority: "medium",
    }
    setClaims([claimWithId, ...claims])
    setIsNewClaimModalOpen(false)
  }

  const awaitingPhotosClaims = claims.filter((claim) => claim.status === "awaiting-photos")
  const aiInProgressClaims = claims.filter((claim) => claim.status === "ai-in-progress")
  const pendingReviewClaims = claims.filter((claim) => claim.status === "pending-review")
  const pendingApprovalClaims = claims.filter((claim) => claim.status === "pending-approval")
  const completedClaims = claims.filter((claim) => claim.status === "completed")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Car className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Claims Dashboard</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Vehicle Damage Assessment</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button
              onClick={() => setIsNewClaimModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Start New Claim
            </Button>
            <Badge variant="outline" className="text-foreground">
              Agent: John Smith
            </Badge>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{claims.length}</div>
              <p className="text-xs text-muted-foreground">Active claims</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">⚡ Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">{pendingReviewClaims.length}</div>
              <p className="text-xs text-orange-600 font-medium">NEEDS YOUR ATTENTION</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Awaiting Photos</CardTitle>
              <Camera className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{awaitingPhotosClaims.length}</div>
              <p className="text-xs text-muted-foreground">Customer upload needed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <UserCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApprovalClaims.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting senior review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedClaims.length}</div>
              <p className="text-xs text-muted-foreground">Approved & closed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending-review" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger
              value="pending-review"
              className="bg-orange-100 data-[state=active]:bg-orange-200 data-[state=active]:text-orange-800 font-medium"
            >
              🔥 Pending Review
            </TabsTrigger>
            <TabsTrigger value="all">All Claims</TabsTrigger>
            <TabsTrigger value="awaiting-photos">Awaiting Photos</TabsTrigger>
            <TabsTrigger value="ai-in-progress">AI In Progress</TabsTrigger>
            <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending-review" className="space-y-4">
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">🎯 Action Required</h3>
              <p className="text-sm text-orange-700">
                These claims have completed AI assessment and need your review and validation.
              </p>
            </div>
            <div className="grid gap-4">
              {pendingReviewClaims.map((claim) => (
                <Card
                  key={claim.id}
                  className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-orange-400"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">
                        <Clock className="h-4 w-4 mr-1" />
                        Pending Review
                      </Badge>
                    </div>
                    <CardDescription>
                      {claim.customerName} • {claim.vehicleInfo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {claim.aiAssessment && (
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">AI Assessment Complete</h4>
                        <p className="text-sm text-muted-foreground mb-2">{claim.aiAssessment.damageType}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-orange-700">{claim.aiAssessment.estimatedCost}</span>
                          <span className="text-sm text-orange-600">{claim.aiAssessment.confidence}% confidence</span>
                        </div>
                      </div>
                    )}
                    <Link href={`/claim/${claim.id}`}>
                      <Button className="mt-4 bg-orange-600 text-white hover:bg-orange-700">
                        Review & Validate Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {claims.map((claim) => (
                <Card key={claim.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(claim.priority)}>{claim.priority.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(claim.status)}>
                          {getStatusIcon(claim.status)}
                          {claim.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>
                      {claim.customerName} • {claim.vehicleInfo} • Policy: {claim.policyNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Incident Date:</strong> {claim.incidentDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Photos:</strong> {claim.photos} uploaded
                      </p>
                      {claim.aiAssessment && (
                        <div className="p-3 bg-muted rounded-lg">
                          <h4 className="text-sm font-medium mb-2">AI Assessment</h4>
                          <p className="text-sm text-muted-foreground mb-2">{claim.aiAssessment.damageType}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">{claim.aiAssessment.estimatedCost}</span>
                            <span className="text-sm text-muted-foreground">
                              {claim.aiAssessment.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/claim/${claim.id}`}>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          {claim.status === "awaiting-photos" ? "View Details" : "Review Claim"}
                        </Button>
                      </Link>
                      {claim.status === "awaiting-photos" && (
                        <Button size="sm" variant="outline">
                          Send Photo Link
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="awaiting-photos" className="space-y-4">
            <div className="grid gap-4">
              {awaitingPhotosClaims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusIcon(claim.status)}
                        Awaiting Photos
                      </Badge>
                    </div>
                    <CardDescription>
                      {claim.customerName} • {claim.vehicleInfo} • Policy: {claim.policyNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Incident Date:</strong> {claim.incidentDate}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                      <p className="text-sm text-yellow-700">Customer needs to upload damage photos to proceed</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/claim/${claim.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-yellow-600 text-white hover:bg-yellow-700">
                        Send Photo Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-in-progress" className="space-y-4">
            <div className="grid gap-4">
              {aiInProgressClaims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusIcon(claim.status)}
                        AI In Progress
                      </Badge>
                    </div>
                    <CardDescription>
                      {claim.customerName} • {claim.vehicleInfo} • Policy: {claim.policyNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Incident Date:</strong> {claim.incidentDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Photos:</strong> {claim.photos} uploaded
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg mb-4">
                      <p className="text-sm text-blue-700">AI is analyzing {claim.photos} uploaded photos</p>
                      <div className="mt-2">
                        <Progress value={65} className="w-full" />
                        <p className="text-xs text-blue-600 mt-1">Processing damage assessment...</p>
                      </div>
                    </div>
                    <Link href={`/claim/${claim.id}`}>
                      <Button size="sm" variant="outline">
                        View Progress
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending-approval" className="space-y-4">
            <div className="grid gap-4">
              {pendingApprovalClaims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusIcon(claim.status)}
                        Pending Approval
                      </Badge>
                    </div>
                    <CardDescription>
                      {claim.customerName} • {claim.vehicleInfo} • Policy: {claim.policyNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Incident Date:</strong> {claim.incidentDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Photos:</strong> {claim.photos} uploaded
                      </p>
                    </div>
                    {claim.aiAssessment && (
                      <div className="p-3 bg-purple-50 rounded-lg mb-4">
                        <h4 className="text-sm font-medium mb-2">Ready for Senior Review</h4>
                        <p className="text-sm text-muted-foreground mb-2">{claim.aiAssessment.damageType}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{claim.aiAssessment.estimatedCost}</span>
                          <span className="text-sm text-muted-foreground">
                            {claim.aiAssessment.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    )}
                    <Link href={`/claim/${claim.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {completedClaims.map((claim) => (
                <Card key={claim.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{claim.id}</CardTitle>
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusIcon(claim.status)}
                        Completed
                      </Badge>
                    </div>
                    <CardDescription>
                      {claim.customerName} • {claim.vehicleInfo} • Policy: {claim.policyNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Incident Date:</strong> {claim.incidentDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Photos:</strong> {claim.photos} uploaded
                      </p>
                    </div>
                    {claim.aiAssessment && (
                      <div className="p-3 bg-green-50 rounded-lg mb-4">
                        <h4 className="text-sm font-medium mb-2">Final Assessment</h4>
                        <p className="text-sm text-muted-foreground mb-2">{claim.aiAssessment.damageType}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-700">{claim.aiAssessment.estimatedCost}</span>
                          <span className="text-sm text-green-600">✓ Approved</span>
                        </div>
                      </div>
                    )}
                    <Link href={`/claim/${claim.id}`}>
                      <Button size="sm" variant="outline">
                        View Final Report
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <NewClaimModal
        isOpen={isNewClaimModalOpen}
        onClose={() => setIsNewClaimModalOpen(false)}
        onSubmit={handleNewClaim}
      />
    </div>
  )
}
