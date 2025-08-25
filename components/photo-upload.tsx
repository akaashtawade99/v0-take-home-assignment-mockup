"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, X, CheckCircle, FileImage } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoUploadProps {
  claimId: string
  onPhotosUploaded?: (photos: UploadedPhoto[]) => void
  maxPhotos?: number
}

interface UploadedPhoto {
  id: string
  file: File
  preview: string
  status: "uploading" | "complete" | "error"
  progress: number
}

export function PhotoUpload({ claimId, onPhotosUploaded, maxPhotos = 10 }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

    handleFiles(files)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }, [])

  const handleFiles = useCallback(
    (files: File[]) => {
      const remainingSlots = maxPhotos - photos.length
      const filesToProcess = files.slice(0, remainingSlots)

      const newPhotos: UploadedPhoto[] = filesToProcess.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        status: "uploading",
        progress: 0,
      }))

      setPhotos((prev) => [...prev, ...newPhotos])

      // Simulate upload progress
      newPhotos.forEach((photo) => {
        simulateUpload(photo.id)
      })
    },
    [photos.length, maxPhotos],
  )

  const simulateUpload = useCallback((photoId: string) => {
    const interval = setInterval(() => {
      setPhotos((prev) =>
        prev.map((photo) => {
          if (photo.id === photoId) {
            const newProgress = Math.min(photo.progress + Math.random() * 30, 100)
            const isComplete = newProgress >= 100

            return {
              ...photo,
              progress: newProgress,
              status: isComplete ? "complete" : "uploading",
            }
          }
          return photo
        }),
      )
    }, 200)

    setTimeout(
      () => {
        clearInterval(interval)
        setPhotos((prev) =>
          prev.map((photo) => (photo.id === photoId ? { ...photo, progress: 100, status: "complete" } : photo)),
        )
      },
      2000 + Math.random() * 2000,
    )
  }, [])

  const removePhoto = useCallback((photoId: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === photoId)
      if (photo) {
        URL.revokeObjectURL(photo.preview)
      }
      return prev.filter((p) => p.id !== photoId)
    })
  }, [])

  const completedPhotos = photos.filter((p) => p.status === "complete")
  const uploadingPhotos = photos.filter((p) => p.status === "uploading")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Upload Vehicle Damage Photos</span>
          </CardTitle>
          <CardDescription>
            Upload clear photos of the vehicle damage from multiple angles. Maximum {maxPhotos} photos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium">Drop photos here or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports JPG, PNG, HEIC up to 10MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="photo-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <FileImage className="mr-2 h-4 w-4" />
                  Select Photos
                </label>
              </Button>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadingPhotos.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Uploading Photos...</h4>
              <div className="space-y-2">
                {uploadingPhotos.map((photo) => (
                  <div key={photo.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={photo.preview || "/placeholder.svg"}
                        alt="Uploading"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{photo.file.name}</p>
                      <Progress value={photo.progress} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground">{Math.round(photo.progress)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Photos Grid */}
          {completedPhotos.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Uploaded Photos ({completedPhotos.length})</h4>
                <Badge variant="outline" className="text-green-700 bg-green-50">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Ready for AI Analysis
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {completedPhotos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={photo.preview || "/placeholder.svg"}
                        alt="Vehicle damage"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(photo.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <CheckCircle className="mr-1 h-2 w-2" />
                        Uploaded
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {completedPhotos.length > 0 && (
            <div className="mt-6 flex space-x-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Camera className="mr-2 h-4 w-4" />
                Start AI Analysis
              </Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          )}

          {/* Upload Guidelines */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h5 className="text-sm font-medium mb-2">Photo Guidelines</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Take photos from multiple angles (front, back, sides, close-ups)</li>
              <li>• Ensure good lighting and clear visibility of damage</li>
              <li>• Include the vehicle's license plate in at least one photo</li>
              <li>• Capture the overall vehicle and detailed damage shots</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
