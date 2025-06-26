import { Upload, Brain, Activity } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system analyzes medical scans in three simple steps to provide accurate Parkinson's
            detection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Choose Scan Type</h3>
            <p className="text-gray-600">
              Select between MRI or Spiral scan analysis and upload your medical scan along with patient information.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
            <p className="text-gray-600">
              Our specialized neural networks analyze brain patterns and structural changes using advanced algorithms.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Get Results</h3>
            <p className="text-gray-600">
              Receive detailed analysis results with confidence scores and recommendations for next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
