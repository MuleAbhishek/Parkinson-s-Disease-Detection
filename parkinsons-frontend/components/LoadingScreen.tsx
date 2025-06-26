import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain } from "lucide-react"
import type { ScanType } from "@/types"

interface LoadingScreenProps {
  progress: number
  step: string
  scanType: ScanType
}

export default function LoadingScreen({ progress, step, scanType }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="relative mx-auto w-16 h-16 mb-4">
              <Brain className="w-16 h-16 text-blue-600 animate-pulse" />
              <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing {scanType.toUpperCase()} Scan</h2>
            <p className="text-gray-600">Our specialized AI is processing your {scanType} scan...</p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{step}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>This may take a few moments. Please do not close this window.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
