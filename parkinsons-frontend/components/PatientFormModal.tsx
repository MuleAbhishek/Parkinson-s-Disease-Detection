"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Upload, Brain, Zap } from "lucide-react"
import Image from "next/image"
import type { FormData, ScanType } from "@/types"

interface PatientFormModalProps {
  isOpen: boolean
  onClose: () => void
  scanType: ScanType
  formData: FormData
  setFormData: (data: FormData) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function PatientFormModal({
  isOpen,
  onClose,
  scanType,
  formData,
  setFormData,
  onSubmit,
}: PatientFormModalProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      })
    }
  }

  const scanTypeConfig = {
    mri: {
      icon: Brain,
      color: "blue",
      title: "MRI Scan Analysis",
      description: "Brain MRI scan (JPEG, PNG, or DICOM format)",
    },
    spiral: {
      icon: Zap,
      color: "purple",
      title: "Spiral Scan Analysis",
      description: "Spiral imaging scan (JPEG, PNG format)",
    },
  }

  const config = scanTypeConfig[scanType]
  const IconComponent = config.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <IconComponent className={`h-6 w-6 text-${config.color}-600`} />
            <span>Patient Information & {config.title}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base font-medium">
              First Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 h-12"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <Label htmlFor="surname" className="text-base font-medium">
              Last Name
            </Label>
            <Input
              id="surname"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              className="mt-2 h-12"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <Label htmlFor="age" className="text-base font-medium">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-2 h-12"
              placeholder="Enter your age"
              min="1"
              max="120"
              required
            />
          </div>

          <div>
            <Label htmlFor="gender" className="text-base font-medium">
              Gender
            </Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger className="mt-2 h-12">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image" className="text-base font-medium">
              {scanType.toUpperCase()} Scan Image
            </Label>
            <p className="text-sm text-gray-500 mt-1 mb-3">Upload a clear {config.description}</p>
            <Input
              id="image"
              type="file"
              accept="image/*,.dcm"
              onChange={handleImageUpload}
              className="mt-2 h-12"
              required
            />
            {formData.imagePreview && (
              <div className="mt-4 relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <Image
                  src={formData.imagePreview || "/placeholder.svg"}
                  alt={`${scanType.toUpperCase()} Scan Preview`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Privacy & Security</p>
                <p>
                  Your medical data is encrypted and processed securely. We comply with privacy regulations and do not
                  store personal information.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className={`w-full bg-${config.color}-600 hover:bg-${config.color}-700 h-12 text-base`}>
            <Upload className="mr-2 h-5 w-5" />
            Analyze {scanType.toUpperCase()} Scan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
