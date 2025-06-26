"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks"
import Features from "@/components/Features"
import CTA from "@/components/CTA"
import ScanTypeModal from "@/components/ScanTypeModal"
import PatientFormModal from "@/components/PatientFormModal"
import LoadingScreen from "@/components/LoadingScreen"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import type { ScanType } from "@/types"
import { useState } from "react"

export default function Home() {
  const [showScanTypeModal, setShowScanTypeModal] = useState(false)
  const [showPatientForm, setShowPatientForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStep, setLoadingStep] = useState("")
  const [selectedScanType, setSelectedScanType] = useState<ScanType>("mri")
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "",
    image: null as File | null,
    imagePreview: "",
    scanType: "mri" as ScanType,
  })

  const handleGetStarted = () => {
    setShowScanTypeModal(true)
  }

  const handleScanTypeSelect = (scanType: ScanType) => {
    setSelectedScanType(scanType)
    setFormData({ ...formData, scanType })
    setShowScanTypeModal(false)
    setShowPatientForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (!formData.name || !formData.surname || !formData.age || !formData.gender || !formData.image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an image.",
      })
      return
    }

    console.log("Starting form submission...")
    setShowPatientForm(false)
    setIsLoading(true)
    setLoadingProgress(0)

    // Simulate loading steps
    const steps = [
      { step: `Preprocessing ${selectedScanType.toUpperCase()} scan...`, duration: 1000 },
      { step: "Extracting neural features...", duration: 1500 },
      { step: `Running ${selectedScanType.toUpperCase()} analysis...`, duration: 2000 },
      { step: "Comparing with database...", duration: 1200 },
      { step: "Generating report...", duration: 800 },
    ]

    let currentProgress = 0
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(steps[i].step)
      const targetProgress = ((i + 1) / steps.length) * 100

      const startProgress = currentProgress
      const progressDiff = targetProgress - startProgress
      const startTime = Date.now()

      while (currentProgress < targetProgress) {
        const elapsed = Date.now() - startTime
        const progress = Math.min(startProgress + (progressDiff * elapsed) / steps[i].duration, targetProgress)
        setLoadingProgress(progress)
        currentProgress = progress
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
    }

    // Call appropriate API
    try {
      const apiEndpoint = selectedScanType === "mri" ? "/api/analyze-mri" : "/api/analyze-spiral"
      console.log("Calling API endpoint:", apiEndpoint)

      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("surname", formData.surname)
      formDataToSend.append("age", formData.age)
      formDataToSend.append("gender", formData.gender)
      formDataToSend.append("image", formData.image)

      console.log("Sending request with data:", {
        name: formData.name,
        surname: formData.surname,
        age: formData.age,
        gender: formData.gender,
        imageSize: formData.image.size,
        imageName: formData.image.name,
      })

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formDataToSend,
      })

      console.log("Response status:", response.status)
      const result = await response.json()
      console.log("Response data:", result)

      if (result.success) {
        // Use the image preview URL since we can't use the blob URL from API
        result.imageUrl = formData.imagePreview

        // Store result in sessionStorage and navigate to results page
        sessionStorage.setItem("analysisResult", JSON.stringify(result))

        setIsLoading(false)

        // Navigate to results page
        router.push("/results")
      } else {
        throw new Error(result.message || "Analysis failed")
      }
    } catch (error) {
      console.error("Analysis error:", error)
      setIsLoading(false)
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
      })
    }
  }

  const handleViewSavedResults = () => {
    router.push("/saved-results")
  }

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} step={loadingStep} scanType={selectedScanType} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header onViewSavedResults={handleViewSavedResults} />
      <Hero onGetStarted={handleGetStarted} />
      <HowItWorks />
      <Features />
      <CTA onGetStarted={handleGetStarted} />

      <ScanTypeModal
        isOpen={showScanTypeModal}
        onClose={() => setShowScanTypeModal(false)}
        onSelectScanType={handleScanTypeSelect}
      />

      <PatientFormModal
        isOpen={showPatientForm}
        onClose={() => setShowPatientForm(false)}
        scanType={selectedScanType}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />

      <Toaster />
    </div>
  )
}
