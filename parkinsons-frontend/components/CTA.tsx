"use client"

import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface CTAProps {
  onGetStarted: () => void
}

export default function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Upload your medical scan and get AI-powered analysis results in seconds. Early detection can make all the
          difference in treatment outcomes.
        </p>
        <Button size="lg" variant="secondary" onClick={onGetStarted}>
          Start Analysis Now
          <Clock className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
