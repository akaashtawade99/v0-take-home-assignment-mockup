"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhotoUpload } from "./photo-upload"
import { AIAssessmentDisplay } from "./ai-assessment-display"
import { AgentReviewInterface } from "./agent-review-interface"
import { ApprovalWorkflow } from "./approval-workflow"
import { Car, User, Calendar, FileText, Camera } from "lucide-react"

interface ClaimDetailModalProps {
  isOpen: boolean
  onClose: () => void
  claim: {
    id: string
    policyNumber: string
    customerName: string
    vehicleInfo: string
    incidentDate: string
    status: string
    photos: number
    priority: string
    aiAssessment?: {
      damageType: string
      severity: string
      estimatedCost: string
      confidence: number
    }
  }
}

export function ClaimDetailModal({ isOpen, onClose, claim }: ClaimDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const enhancedAssessment = {
    damageType: claim.aiAssessment?.damageType || "No assessment available",
    severity: claim.aiAssessment?.severity || "Unknown",
    estimatedCost: claim.aiAssessment?.estimatedCost || "$0",
    confidence: claim.aiAssessment?.confidence || 0,
    detectedDamages: [
      {
        type: "Bumper Damage",
        location: "Front Center",
        severity: "Moderate" as const,
        confidence: 94,
        estimatedCost: 1200,
      },
      {
        type: "Headlight Crack",
        location: "Front Right",
        severity: "Minor" as const,
        confidence: 89,
        estimatedCost: 450,
      },
    ],
    repairRecommendations: [
      {
        part: "Front Bumper Assembly",
        action: "Replace" as const,
        priority: "High" as const,
        estimatedCost: 1200,
        laborHours: 4,
      },
      {
        part: "Right Headlight Unit",
        action: "Replace" as const,
        priority: "Medium" as const,
        estimatedCost: 450,
        laborHours: 2,
      },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>Claim Details - {claim.id}</span>
          </DialogTitle>
          <DialogDescription>Review and process vehicle damage claim</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="assessment">AI Assessment</TabsTrigger>
            <TabsTrigger value="review">Agent Review</TabsTrigger>
            <TabsTrigger value="approval">Approval</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Customer:</span>
                  <span className="text-sm">{claim.customerName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Policy:</span>
                  <span className="text-sm">{claim.policyNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Vehicle:</span>
                  <span className="text-sm">{claim.vehicleInfo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Incident Date:</span>
                  <span className="text-sm">{claim.incidentDate}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="outline">{claim.status.replace("-", " ")}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Priority:</span>
                  <Badge variant="outline">{claim.priority}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Photos:</span>
                  <span className="text-sm">{claim.photos} uploaded</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <PhotoUpload
              claimId={claim.id}
              onPhotosUploaded={(photos) => {
                console.log("[v0] Photos uploaded:", photos)
                // Handle photo upload completion
              }}
            />
          </TabsContent>

          <TabsContent value="assessment" className="space-y-4">
            {claim.aiAssessment ? (
              <AIAssessmentDisplay
                assessment={claim.aiAssessment}
                onApprove={() => {
                  console.log("[v0] Assessment approved for claim:", claim.id)
                  // Handle assessment approval
                }}
                onRequestReview={() => {
                  console.log("[v0] Manual review requested for claim:", claim.id)
                  // Handle manual review request
                }}
                onEditAssessment={() => {
                  console.log("[v0] Edit assessment for claim:", claim.id)
                  setActiveTab("review") // Switch to review tab for editing
                }}
              />
            ) : (
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <p className="text-sm text-yellow-700">AI assessment pending. Upload photos to begin analysis.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            {claim.aiAssessment ? (
              <AgentReviewInterface
                claimId={claim.id}
                assessment={enhancedAssessment}
                onSaveReview={(reviewData) => {
                  console.log("[v0] Review saved:", reviewData)
                  // Handle review save
                }}
                onSubmitForApproval={(reviewData) => {
                  console.log("[v0] Submitted for approval:", reviewData)
                  // Handle submission for approval
                  setActiveTab("approval") // Move to approval tab
                }}
              />
            ) : (
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <p className="text-sm text-yellow-700">Complete AI assessment before agent review.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approval" className="space-y-4">
            <ApprovalWorkflow
              claimId={claim.id}
              reviewData={{
                originalAssessment: claim.aiAssessment || {
                  damageType: "No assessment",
                  severity: "Unknown",
                  estimatedCost: "$0",
                  confidence: 0,
                },
                editedAssessment: enhancedAssessment,
                agentNotes:
                  "Agent review completed with adjustments to cost estimates based on detailed photo analysis.",
                adjustmentReason:
                  "Bumper damage severity underestimated by AI - mounting point damage requires additional repair work",
                hasAdjustments: true,
                reviewDate: new Date().toISOString(),
                agentId: "agent-001",
              }}
              onApprove={(approvalData) => {
                console.log("[v0] Claim approved:", approvalData)
                // Handle approval
                onClose() // Close modal after approval
              }}
              onReject={(rejectionData) => {
                console.log("[v0] Claim rejected:", rejectionData)
                // Handle rejection
                onClose() // Close modal after rejection
              }}
              onRequestRevision={(revisionData) => {
                console.log("[v0] Revision requested:", revisionData)
                // Handle revision request
                setActiveTab("review") // Send back to review tab
              }}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
