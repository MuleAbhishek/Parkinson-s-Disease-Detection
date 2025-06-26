"use client"

import { Button } from "@/components/ui/button"
import { Brain, CheckCircle, Shield } from "lucide-react"

interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Early Detection of <span className="text-blue-600">Parkinson's Disease</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Advanced AI-powered analysis of MRI and Spiral scans for early detection of Parkinson's disease. Get
            accurate, fast results to enable timely intervention and better patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              onClick={onGetStarted}
            >
              Get Started
              <Brain className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Research Grade</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
