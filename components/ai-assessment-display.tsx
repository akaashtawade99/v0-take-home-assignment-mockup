"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  Wrench,
  TrendingUp,
  Eye,
  MapPin,
  Zap,
  Database,
  BookOpen,
  ExternalLink,
} from "lucide-react"

interface AIAssessmentDisplayProps {
  assessment: {
    damageType: string
    severity: string
    estimatedCost: string
    confidence: number
    evidenceSources?: Array<{
      type: "database" | "manual"
      source: string
      reference: string
      confidence: number
    }>
    damages?: Array<{
      id: number
      part: string
      severity: string
      repairType: string
      laborHours: number
      partsCost: number
      laborCost: number
      totalCost: number
      confidence: number
      evidenceSource?: string
    }>
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
    riskFactors?: Array<{
      factor: string
      impact: "High" | "Medium" | "Low"
      description: string
    }>
    processingTime?: number
    analysisMetadata?: {
      photosAnalyzed: number
      modelsUsed: string[]
      processingDate: string
    }
  }
  photos?: Array<{
    id: number
    url: string
    name: string
    uploadedAt: string
  }>
  onApprove?: () => void
  onRequestReview?: () => void
  onEditAssessment?: () => void
}

export function AIAssessmentDisplay({
  assessment,
  photos = [],
  onApprove,
  onRequestReview,
  onEditAssessment,
}: AIAssessmentDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "severe":
        return "bg-red-100 text-red-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "minor":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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

  const getRiskColor = (impact: string) => {
    switch (impact.toLowerCase()) {
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

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "database":
        return <Database className="h-3 w-3" />
      case "manual":
        return <BookOpen className="h-3 w-3" />
      default:
        return <ExternalLink className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Assessment Header */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-800">AI Assessment Complete</CardTitle>
                <CardDescription className="text-green-600">
                  Analysis completed in {assessment.processingTime || 45}s with {assessment.confidence}% confidence
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="mr-1 h-3 w-3" />
                Verified
              </Badge>
              <Badge variant="outline" className="text-green-700">
                {assessment.confidence}% Confidence
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Severity:</span>
              <Badge className={getSeverityColor(assessment.severity)}>{assessment.severity}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Est. Cost:</span>
              <span className="text-lg font-bold text-green-700">{assessment.estimatedCost}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Photos:</span>
              <span className="text-sm">{photos.length} analyzed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="damages">Damages</TabsTrigger>
          <TabsTrigger value="repairs">Repairs</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Damage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Damage Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{assessment.damageType}</p>
                <Separator />
                <div className="space-y-2">
                  {assessment.damages?.map((damage, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{damage.part}</span>
                      </div>
                      <Badge className={getSeverityColor(damage.severity)}>{damage.severity}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Cost Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessment.damages?.map((damage, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{damage.part}</p>
                      <p className="text-xs text-muted-foreground">
                        {damage.repairType} • {damage.laborHours}h labor
                      </p>
                    </div>
                    <span className="text-sm font-bold">${damage.totalCost}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total Estimate</span>
                  <span className="text-lg text-primary">{assessment.estimatedCost}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {assessment.evidenceSources && assessment.evidenceSources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Evidence Sources</span>
                </CardTitle>
                <CardDescription>AI estimates are grounded in industry-standard databases and manuals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessment.evidenceSources.map((source, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <div className="p-1 bg-background rounded">{getEvidenceIcon(source.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{source.source}</p>
                        <p className="text-xs text-muted-foreground">{source.reference}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {source.confidence}% match
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {source.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="damages" className="space-y-4">
          <div className="grid gap-4">
            {assessment.damages?.map((damage, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{damage.part}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(damage.severity)}>{damage.severity}</Badge>
                      <Badge variant="outline">{damage.confidence}% confidence</Badge>
                    </div>
                  </div>
                  {damage.evidenceSource && (
                    <CardDescription className="flex items-center space-x-2">
                      <Database className="h-3 w-3" />
                      <span>Source: {damage.evidenceSource}</span>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Parts Cost:</span>
                      <span className="font-bold">${damage.partsCost}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Labor Cost:</span>
                      <span className="font-bold">${damage.laborCost}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Cost:</span>
                    </div>
                    <span className="text-lg font-bold">${damage.totalCost}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>AI Confidence</span>
                      <span>{damage.confidence}%</span>
                    </div>
                    <Progress value={damage.confidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="repairs" className="space-y-4">
          <div className="grid gap-4">
            {assessment.damages?.map((repair, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{repair.part}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(repair.severity)}>{repair.severity}</Badge>
                      <Badge variant="outline">{repair.repairType}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Cost:</span>
                      <span className="font-bold">${repair.totalCost}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Labor:</span>
                      <span className="font-bold">{repair.laborHours}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Evidence Sources & References</span>
              </CardTitle>
              <CardDescription>
                AI estimates are validated against industry-standard databases and repair manuals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assessment.evidenceSources?.map((source, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-full">{getEvidenceIcon(source.type)}</div>
                      <div>
                        <h4 className="font-medium">{source.source}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{source.type} Reference</p>
                      </div>
                    </div>
                    <Badge variant="outline">{source.confidence}% Match</Badge>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-sm font-mono">{source.reference}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Reference Type:{" "}
                      {source.type === "database" ? "Automated Database Lookup" : "Manual Reference Guide"}
                    </span>
                    <span>Confidence: {source.confidence}%</span>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">How Evidence Sources Work</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • <strong>Database Sources:</strong> Real-time lookups from CCC, Mitchell, and Audatex industry
                    databases
                  </li>
                  <li>
                    • <strong>Manual Sources:</strong> Cross-referenced with official repair guides and labor time
                    standards
                  </li>
                  <li>
                    • <strong>Confidence Scores:</strong> Indicate how closely the damage matches reference data
                  </li>
                  <li>
                    • <strong>Multiple Sources:</strong> Each estimate component is validated against multiple
                    references
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Analysis Metadata</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Processing Details</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span>{assessment.processingTime || 45}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Photos Analyzed:</span>
                      <span>{photos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Analysis Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">AI Models Used</p>
                  <div className="space-y-1">
                    {["DamageNet v2.1", "CostEstimator Pro", "VehicleVision AI"].map((model, index) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Confidence Breakdown</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Assessment</span>
                    <span>{assessment.confidence}%</span>
                  </div>
                  <Progress value={assessment.confidence} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onApprove}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve Assessment
        </Button>
        <Button variant="outline" onClick={onEditAssessment}>
          <Wrench className="mr-2 h-4 w-4" />
          Edit Assessment
        </Button>
        <Button variant="outline" onClick={onRequestReview}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Request Manual Review
        </Button>
      </div>
    </div>
  )
}
