"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Mail, Phone, CheckCircle, Clock } from "lucide-react"

interface NewClaimModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (claimData: any) => void // Added onSubmit prop to handle claim creation
}

export function NewClaimModal({ isOpen, onClose, onSubmit }: NewClaimModalProps) {
  const [step, setStep] = useState(1)
  const [claimData, setClaimData] = useState({
    policyNumber: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    incidentDate: "",
    incidentDescription: "",
    priority: "medium",
  })
  const [generatedClaimId, setGeneratedClaimId] = useState("")
  const [customerLink, setCustomerLink] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setClaimData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateClaim = () => {
    // Generate claim ID and customer link
    const claimId = `CLM-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
    const link = `https://claims.insurancecompany.com/upload/${claimId}`

    setGeneratedClaimId(claimId)
    setCustomerLink(link)

    const newClaimData = {
      ...claimData,
      vehicleInfo: `${claimData.vehicleYear} ${claimData.vehicleMake} ${claimData.vehicleModel}`,
      id: claimId,
    }

    onSubmit(newClaimData)
    setStep(2)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const sendCustomerLink = (method: "email" | "sms") => {
    // Simulate sending link
    console.log(`Sending link via ${method} to customer`)
    setStep(3)
  }

  const resetAndClose = () => {
    setStep(1)
    setClaimData({
      policyNumber: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      incidentDate: "",
      incidentDescription: "",
      priority: "medium",
    })
    setGeneratedClaimId("")
    setCustomerLink("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Start New Claim</DialogTitle>
              <DialogDescription>
                Create a new claim on behalf of the customer and generate a secure upload link
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    value={claimData.policyNumber}
                    onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                    placeholder="POL-123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={claimData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={claimData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={claimData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    placeholder="john.doe@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Customer Phone</Label>
                  <Input
                    id="customerPhone"
                    value={claimData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleYear">Vehicle Year</Label>
                  <Input
                    id="vehicleYear"
                    value={claimData.vehicleYear}
                    onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                    placeholder="2022"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleMake">Make</Label>
                  <Input
                    id="vehicleMake"
                    value={claimData.vehicleMake}
                    onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                    placeholder="Honda"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Model</Label>
                  <Input
                    id="vehicleModel"
                    value={claimData.vehicleModel}
                    onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                    placeholder="Accord"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDate">Incident Date</Label>
                <Input
                  id="incidentDate"
                  type="date"
                  value={claimData.incidentDate}
                  onChange={(e) => handleInputChange("incidentDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDescription">Incident Description</Label>
                <Textarea
                  id="incidentDescription"
                  value={claimData.incidentDescription}
                  onChange={(e) => handleInputChange("incidentDescription", e.target.value)}
                  placeholder="Brief description of the incident and initial damage assessment..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateClaim}
                disabled={!claimData.policyNumber || !claimData.customerName}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Claim
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Claim Created Successfully</DialogTitle>
              <DialogDescription>
                Send the secure upload link to the customer so they can submit damage photos
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Claim Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Claim ID:</span>
                    <Badge variant="outline">{generatedClaimId}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Customer:</span>
                    <span>{claimData.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle:</span>
                    <span>
                      {claimData.vehicleYear} {claimData.vehicleMake} {claimData.vehicleModel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Priority:</span>
                    <Badge
                      className={
                        claimData.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : claimData.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {claimData.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Upload Link</CardTitle>
                  <CardDescription>Share this secure link with the customer to upload damage photos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <code className="flex-1 text-sm">{customerLink}</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(customerLink)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => sendCustomerLink("email")}
                  disabled={!claimData.customerEmail}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send via Email
                </Button>
                <Button onClick={() => sendCustomerLink("sms")} disabled={!claimData.customerPhone} variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Send via SMS
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetAndClose}>
                Done
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Link Sent Successfully</DialogTitle>
              <DialogDescription>
                The customer has been notified and can now upload their damage photos
              </DialogDescription>
            </DialogHeader>

            <div className="py-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-8 w-8" />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Customer Notified</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Claim {generatedClaimId} is now waiting for photo uploads
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-700">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">Next Steps</span>
                    </div>
                    <ul className="mt-2 text-sm text-blue-600 space-y-1">
                      <li>• Customer will receive the upload link</li>
                      <li>• Photos will trigger automatic AI assessment</li>
                      <li>• Claim will appear in your dashboard when ready</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={resetAndClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Return to Dashboard
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
