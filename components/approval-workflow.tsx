"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  User,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  Stamp,
} from "lucide-react"

interface ApprovalWorkflowProps {
  claimId: string
  reviewData: {
    originalAssessment: {
      damageType: string
      severity: string
      estimatedCost: string
      confidence: number
    }
    editedAssessment: {
      damageType: string
      severity: string
      estimatedCost: string
      confidence: number
      detectedDamages?: Array<{
        type: string
        location: string
        severity: string
        confidence: number
        estimatedCost: number
      }>
      repairRecommendations?: Array<{
        part: string
        action: string
        priority: string
        estimatedCost: number
        laborHours: number
      }>
    }
    agentNotes: string
    adjustmentReason: string
    hasAdjustments: boolean
    reviewDate: string
    agentId: string
  }
  onApprove?: (approvalData: any) => void
  onReject?: (rejectionData: any) => void
  onRequestRevision?: (revisionData: any) => void
}

const mockReviewData = {
  originalAssessment: {
    damageType: "Front bumper damage, headlight crack",
    severity: "Moderate",
    estimatedCost: "$2,850",
    confidence: 92,
  },
  editedAssessment: {
    damageType: "Front bumper damage, headlight crack",
    severity: "Moderate",
    estimatedCost: "$3,200",
    confidence: 92,
    detectedDamages: [
      {
        type: "Bumper Damage",
        location: "Front Center",
        severity: "Moderate",
        confidence: 94,
        estimatedCost: 1400, // Agent increased from 1200
      },
      {
        type: "Headlight Crack",
        location: "Front Right",
        severity: "Minor",
        confidence: 89,
        estimatedCost: 450,
      },
    ],
    repairRecommendations: [
      {
        part: "Front Bumper Assembly",
        action: "Replace",
        priority: "High",
        estimatedCost: 1400, // Agent increased
        laborHours: 5, // Agent increased from 4
      },
      {
        part: "Right Headlight Unit",
        action: "Replace",
        priority: "Medium",
        estimatedCost: 450,
        laborHours: 2,
      },
    ],
  },
  agentNotes:
    "Upon closer inspection of the photos, the bumper damage appears more extensive than initially assessed. The mounting points show stress fractures that will require additional labor time. Increased estimate to account for proper repair.",
  adjustmentReason:
    "Bumper damage severity underestimated by AI - mounting point damage requires additional repair work",
  hasAdjustments: true,
  reviewDate: "2024-01-15T14:30:00Z",
  agentId: "agent-001",
}

export function ApprovalWorkflow({
  claimId,
  reviewData = mockReviewData,
  onApprove,
  onReject,
  onRequestRevision,
}: ApprovalWorkflowProps) {
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected" | "revision-requested">(
    "pending",
  )
  const [adjusterNotes, setAdjusterNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [revisionRequests, setRevisionRequests] = useState("")

  const originalCost = Number.parseFloat(reviewData.originalAssessment.estimatedCost.replace("$", "").replace(",", ""))
  const editedCost = Number.parseFloat(reviewData.editedAssessment.estimatedCost.replace("$", "").replace(",", ""))
  const costDifference = editedCost - originalCost
  const costChangePercent = ((costDifference / originalCost) * 100).toFixed(1)

  const handleApprove = () => {
    const approvalData = {
      claimId,
      reviewData,
      approvalStatus: "approved",
      adjusterNotes,
      approvalDate: new Date().toISOString(),
      adjusterId: "adjuster-001", // Mock adjuster ID
      finalEstimate: reviewData.editedAssessment.estimatedCost,
    }
    setApprovalStatus("approved")
    onApprove?.(approvalData)
  }

  const handleReject = () => {
    const rejectionData = {
      claimId,
      reviewData,
      approvalStatus: "rejected",
      rejectionReason,
      adjusterNotes,
      rejectionDate: new Date().toISOString(),
      adjusterId: "adjuster-001",
    }
    setApprovalStatus("rejected")
    onReject?.(rejectionData)
  }

  const handleRequestRevision = () => {
    const revisionData = {
      claimId,
      reviewData,
      approvalStatus: "revision-requested",
      revisionRequests,
      adjusterNotes,
      revisionDate: new Date().toISOString(),
      adjusterId: "adjuster-001",
    }
    setApprovalStatus("revision-requested")
    onRequestRevision?.(revisionData)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "revision-requested":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "revision-requested":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Approval Header */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-purple-800">Senior Adjuster Approval</CardTitle>
                <CardDescription className="text-purple-600">
                  Final review and approval for claim {claimId}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(approvalStatus)}>
                {getStatusIcon(approvalStatus)}
                <span className="ml-1 capitalize">{approvalStatus.replace("-", " ")}</span>
              </Badge>
              {reviewData.hasAdjustments && (
                <Badge variant="outline" className="text-orange-700 bg-orange-50">
                  Agent Modified
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Reviewed by:</span>
              <span className="text-sm">Agent {reviewData.agentId}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Review Date:</span>
              <span className="text-sm">{new Date(reviewData.reviewDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Final Estimate:</span>
              <span className="text-lg font-bold text-purple-700">{reviewData.editedAssessment.estimatedCost}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Cost Comparison</TabsTrigger>
          <TabsTrigger value="review">Agent Review</TabsTrigger>
          <TabsTrigger value="decision">Approval Decision</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          {/* Cost Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Cost Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">AI Original Estimate</p>
                  <p className="text-2xl font-bold">{reviewData.originalAssessment.estimatedCost}</p>
                  <Badge variant="outline" className="mt-1">
                    {reviewData.originalAssessment.confidence}% confidence
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Agent Reviewed Estimate</p>
                  <p className="text-2xl font-bold text-primary">{reviewData.editedAssessment.estimatedCost}</p>
                  <Badge variant="outline" className="mt-1">
                    Agent Validated
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Cost Adjustment</p>
                  <div className="flex items-center justify-center space-x-1">
                    {costDifference > 0 ? (
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    ) : costDifference < 0 ? (
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-600" />
                    )}
                    <p
                      className={`text-2xl font-bold ${
                        costDifference > 0 ? "text-red-600" : costDifference < 0 ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {costDifference > 0 ? "+" : ""}${Math.abs(costDifference)}
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-1">
                    {costChangePercent}% change
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Repair Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reviewData.editedAssessment.repairRecommendations?.map((repair, index) => {
                  const originalRepair = mockReviewData.originalAssessment // Would need original repair data
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{repair.part}</p>
                        <p className="text-sm text-muted-foreground">
                          {repair.action} • {repair.priority} Priority • {repair.laborHours}h labor
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${repair.estimatedCost}</p>
                        {index === 0 && ( // Show change for first item as example
                          <p className="text-sm text-red-600">+$200 from AI</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Agent Review Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Agent Notes</Label>
                <div className="mt-1 p-3 bg-muted rounded-lg">
                  <p className="text-sm">{reviewData.agentNotes}</p>
                </div>
              </div>

              {reviewData.hasAdjustments && (
                <div>
                  <Label className="text-sm font-medium">Adjustment Justification</Label>
                  <div className="mt-1 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">{reviewData.adjustmentReason}</p>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Review Metadata</Label>
                <div className="mt-1 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>Agent ID: {reviewData.agentId}</div>
                  <div>Review Date: {new Date(reviewData.reviewDate).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decision" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stamp className="h-4 w-4" />
                <span>Adjuster Decision</span>
              </CardTitle>
              <CardDescription>Make final approval decision for this claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adjuster-notes">Adjuster Notes</Label>
                <Textarea
                  id="adjuster-notes"
                  placeholder="Add your review comments and decision rationale..."
                  value={adjusterNotes}
                  onChange={(e) => setAdjusterNotes(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {approvalStatus === "rejected" && (
                <div>
                  <Label htmlFor="rejection-reason">Rejection Reason</Label>
                  <Select value={rejectionReason} onValueChange={setRejectionReason}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select rejection reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="insufficient-documentation">Insufficient Documentation</SelectItem>
                      <SelectItem value="cost-too-high">Cost Estimate Too High</SelectItem>
                      <SelectItem value="coverage-issue">Coverage Issue</SelectItem>
                      <SelectItem value="fraud-concern">Fraud Concern</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {approvalStatus === "revision-requested" && (
                <div>
                  <Label htmlFor="revision-requests">Revision Requests</Label>
                  <Textarea
                    id="revision-requests"
                    placeholder="Specify what needs to be revised..."
                    value={revisionRequests}
                    onChange={(e) => setRevisionRequests(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Decision Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleApprove}
              disabled={approvalStatus !== "pending"}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Claim
            </Button>
            <Button
              variant="outline"
              className="border-yellow-600 text-yellow-700 hover:bg-yellow-50 bg-transparent"
              onClick={() => setApprovalStatus("revision-requested")}
              disabled={approvalStatus !== "pending"}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Request Revision
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-700 hover:bg-red-50 bg-transparent"
              onClick={() => setApprovalStatus("rejected")}
              disabled={approvalStatus !== "pending"}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Claim
            </Button>
          </div>

          {approvalStatus === "revision-requested" && (
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" onClick={handleRequestRevision}>
              Submit Revision Request
            </Button>
          )}

          {approvalStatus === "rejected" && (
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleReject}>
              Confirm Rejection
            </Button>
          )}
        </TabsContent>
      </Tabs>

      {/* Final Status */}
      {approvalStatus !== "pending" && (
        <Card
          className={`border-2 ${
            approvalStatus === "approved"
              ? "border-green-200 bg-green-50"
              : approvalStatus === "rejected"
                ? "border-red-200 bg-red-50"
                : "border-yellow-200 bg-yellow-50"
          }`}
        >
          <CardHeader>
            <CardTitle
              className={`flex items-center space-x-2 ${
                approvalStatus === "approved"
                  ? "text-green-800"
                  : approvalStatus === "rejected"
                    ? "text-red-800"
                    : "text-yellow-800"
              }`}
            >
              {getStatusIcon(approvalStatus)}
              <span>Decision: {approvalStatus.replace("-", " ").toUpperCase()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Decision Date:</p>
                <p>{new Date().toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Adjuster:</p>
                <p>Senior Adjuster (adjuster-001)</p>
              </div>
              {approvalStatus === "approved" && (
                <div className="col-span-2">
                  <p className="font-medium">Authorized Amount:</p>
                  <p className="text-lg font-bold text-green-700">{reviewData.editedAssessment.estimatedCost}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
