"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Edit3,
  Save,
  RotateCcw,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  User,
  FileText,
} from "lucide-react"

interface AgentReviewInterfaceProps {
  claimId: string
  assessment: {
    damageType: string
    severity: string
    estimatedCost: string
    confidence: number
    detectedDamages?: Array<{
      type: string
      location: string
      severity: "Minor" | "Moderate" | "Severe"
      confidence: number
      estimatedCost: number
    }>
    repairRecommendations?: Array<{
      part: string
      action: "Repair" | "Replace"
      priority: "High" | "Medium" | "Low"
      estimatedCost: number
      laborHours: number
    }>
  }
  onSaveReview?: (reviewData: any) => void
  onSubmitForApproval?: (reviewData: any) => void
}

export function AgentReviewInterface({
  claimId,
  assessment,
  onSaveReview,
  onSubmitForApproval,
}: AgentReviewInterfaceProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAssessment, setEditedAssessment] = useState(assessment)
  const [agentNotes, setAgentNotes] = useState("")
  const [reviewStatus, setReviewStatus] = useState<"pending" | "approved" | "needs-revision">("pending")
  const [adjustmentReason, setAdjustmentReason] = useState("")
  const [hasAdjustments, setHasAdjustments] = useState(false)

  const handleDamageEdit = (index: number, field: string, value: any) => {
    const updatedDamages = [...(editedAssessment.detectedDamages || [])]
    updatedDamages[index] = { ...updatedDamages[index], [field]: value }
    setEditedAssessment({ ...editedAssessment, detectedDamages: updatedDamages })
    setHasAdjustments(true)
  }

  const handleRepairEdit = (index: number, field: string, value: any) => {
    const updatedRepairs = [...(editedAssessment.repairRecommendations || [])]
    updatedRepairs[index] = { ...updatedRepairs[index], [field]: value }
    setEditedAssessment({ ...editedAssessment, repairRecommendations: updatedRepairs })
    setHasAdjustments(true)
  }

  const handleSave = () => {
    const reviewData = {
      claimId,
      originalAssessment: assessment,
      editedAssessment,
      agentNotes,
      adjustmentReason,
      hasAdjustments,
      reviewStatus,
      reviewDate: new Date().toISOString(),
      agentId: "agent-001", // Mock agent ID
    }
    onSaveReview?.(reviewData)
    setIsEditing(false)
  }

  const handleSubmitForApproval = () => {
    const reviewData = {
      claimId,
      originalAssessment: assessment,
      editedAssessment,
      agentNotes,
      adjustmentReason,
      hasAdjustments,
      reviewStatus: "approved",
      reviewDate: new Date().toISOString(),
      agentId: "agent-001", // Mock agent ID
    }
    onSubmitForApproval?.(reviewData)
  }

  const handleReset = () => {
    setEditedAssessment(assessment)
    setHasAdjustments(false)
    setAdjustmentReason("")
  }

  const totalOriginalCost =
    assessment.repairRecommendations?.reduce((sum, repair) => sum + repair.estimatedCost, 0) || 0
  const totalEditedCost =
    editedAssessment.repairRecommendations?.reduce((sum, repair) => sum + repair.estimatedCost, 0) || 0
  const costDifference = totalEditedCost - totalOriginalCost

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-blue-800">Agent Review</CardTitle>
                <CardDescription className="text-blue-600">
                  Review and validate AI assessment for claim {claimId}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={reviewStatus === "approved" ? "default" : "secondary"}>
                {reviewStatus === "pending" && <Clock className="mr-1 h-3 w-3" />}
                {reviewStatus === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                {reviewStatus === "needs-revision" && <AlertTriangle className="mr-1 h-3 w-3" />}
                {reviewStatus.replace("-", " ").toUpperCase()}
              </Badge>
              {hasAdjustments && (
                <Badge variant="outline" className="text-orange-700 bg-orange-50">
                  Modified
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit3 className="mr-2 h-4 w-4" />
                {isEditing ? "Exit Edit Mode" : "Edit Assessment"}
              </Button>
              {isEditing && (
                <>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Changes
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                </>
              )}
            </div>
            {costDifference !== 0 && (
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Cost Adjustment:</span>
                <span className={`font-bold ${costDifference > 0 ? "text-red-600" : "text-green-600"}`}>
                  {costDifference > 0 ? "+" : ""}${costDifference}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="damages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="damages">Review Damages</TabsTrigger>
          <TabsTrigger value="repairs">Review Repairs</TabsTrigger>
          <TabsTrigger value="notes">Agent Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="damages" className="space-y-4">
          <div className="grid gap-4">
            {editedAssessment.detectedDamages?.map((damage, index) => (
              <Card key={index} className={isEditing ? "border-blue-200" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{damage.type}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <Select
                          value={damage.severity}
                          onValueChange={(value) => handleDamageEdit(index, "severity", value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Minor">Minor</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Severe">Severe</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline">{damage.severity}</Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>{damage.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Estimated Cost</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={damage.estimatedCost}
                          onChange={(e) => handleDamageEdit(index, "estimatedCost", Number.parseInt(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-lg font-bold mt-1">${damage.estimatedCost}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">AI Confidence</Label>
                      <p className="text-sm text-muted-foreground mt-1">{damage.confidence}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="repairs" className="space-y-4">
          <div className="grid gap-4">
            {editedAssessment.repairRecommendations?.map((repair, index) => (
              <Card key={index} className={isEditing ? "border-blue-200" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{repair.part}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <>
                          <Select
                            value={repair.action}
                            onValueChange={(value) => handleRepairEdit(index, "action", value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Repair">Repair</SelectItem>
                              <SelectItem value="Replace">Replace</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select
                            value={repair.priority}
                            onValueChange={(value) => handleRepairEdit(index, "priority", value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline">{repair.action}</Badge>
                          <Badge variant="outline">{repair.priority} Priority</Badge>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Cost</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={repair.estimatedCost}
                          onChange={(e) => handleRepairEdit(index, "estimatedCost", Number.parseInt(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-lg font-bold mt-1">${repair.estimatedCost}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Labor Hours</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={repair.laborHours}
                          onChange={(e) => handleRepairEdit(index, "laborHours", Number.parseInt(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-lg font-bold mt-1">{repair.laborHours}h</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Summary */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Original AI Estimate:</span>
                  <span className="font-bold">${totalOriginalCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reviewed Estimate:</span>
                  <span className="font-bold">${totalEditedCost}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Adjustment:</span>
                  <span className={costDifference > 0 ? "text-red-600" : costDifference < 0 ? "text-green-600" : ""}>
                    {costDifference > 0 ? "+" : ""}${costDifference}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Agent Review Notes</span>
              </CardTitle>
              <CardDescription>
                Add your professional assessment and any adjustments made to the AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="agent-notes">Review Comments</Label>
                <Textarea
                  id="agent-notes"
                  placeholder="Enter your review comments, observations, and rationale for any adjustments..."
                  value={agentNotes}
                  onChange={(e) => setAgentNotes(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {hasAdjustments && (
                <div>
                  <Label htmlFor="adjustment-reason">Reason for Adjustments</Label>
                  <Textarea
                    id="adjustment-reason"
                    placeholder="Explain why you made adjustments to the AI assessment..."
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Review Status</Label>
                <Select value={reviewStatus} onValueChange={setReviewStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="needs-revision">Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="quality-check" />
                <Label htmlFor="quality-check" className="text-sm">
                  I have thoroughly reviewed the AI assessment and confirm accuracy
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Review
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSubmitForApproval}
            disabled={reviewStatus !== "approved"}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  )
}
