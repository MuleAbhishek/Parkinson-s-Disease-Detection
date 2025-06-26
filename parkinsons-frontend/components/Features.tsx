import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Zap, Microscope, Database, Clock } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Detection Technology</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge platform combines multiple scan types with specialized AI models for comprehensive
            analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Dual Scan Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Support for both MRI and Spiral scan analysis with specialized AI models trained for each scan type.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Secure Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your medical data is encrypted and processed securely with strict privacy standards and compliance.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <CardTitle>Real-time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get preliminary analysis results in seconds with our optimized processing pipeline.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Microscope className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Research Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Built on latest research in neuroimaging and machine learning for Parkinson's disease detection.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Database className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Comprehensive Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Trained on diverse datasets including multiple demographics and scan types for robust analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle>Early Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Designed to detect early-stage patterns that may not be visible to traditional diagnostic methods.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
