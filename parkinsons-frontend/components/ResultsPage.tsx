"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Users,
  Activity,
  Stethoscope,
  AlertTriangle,
  Zap,
  Save,
  Check,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Header from "./Header";
import { useState } from "react";
import { saveResult } from "@/lib/storage";
import type { AnalysisResult } from "@/types";
import { toast } from "sonner";

interface ResultsPageProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
  onViewSavedResults: () => void;
}

export default function ResultsPage({
  result,
  onNewAnalysis,
  onViewSavedResults,
}: ResultsPageProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Define color schemes for different scan types
  const colorSchemes = {
    mri: {
      primary: "blue",
      secondary: "blue",
      gradient: "from-blue-50 to-blue-100",
      icon: Brain,
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    spiral: {
      primary: "purple",
      secondary: "purple",
      gradient: "from-purple-50 to-purple-100",
      icon: Zap,
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
      badgeColor: "bg-purple-100 text-purple-800",
    },
  };

  const scheme = colorSchemes[result.scanType as keyof typeof colorSchemes];
  const ScanIcon = scheme.icon;

  const handleSaveResult = async () => {
    try {
      // Convert image URL to base64
      const response = await fetch(result.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.readAsDataURL(blob);
      });

      const base64Image = await base64Promise;

      // Generate UUID only on client side
      const id = typeof window !== "undefined" ? crypto.randomUUID() : "";

      const resultToSave = {
        ...result,
        id,
        savedAt: new Date().toISOString(),
        imageUrl: base64Image,
      };

      saveResult(resultToSave);
      setIsSaved(true);

      toast.success("Result saved successfully", {
        description:
          "You can access this result later from your saved results.",
        action: {
          label: "View saved results",
          onClick: onViewSavedResults,
        },
      });
    } catch (error) {
      console.error("Error saving result:", error);
      toast.error("Failed to save result", {
        description: "There was an error saving the result. Please try again.",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${scheme.gradient}`}>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onNewAnalysis}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Analysis Complete
                </h1>
                <p className="text-gray-600">
                  AI-powered {result.scanType.toUpperCase()} scan analysis
                  results
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className={`${isSaved ? "bg-green-50" : ""}`}
                onClick={handleSaveResult}
                disabled={isSaved}
              >
                {isSaved ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Result
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={onViewSavedResults}>
                View Saved Results
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left Column - Patient Information */}
            <div className="space-y-6">
              <Card className={`${scheme.borderColor} border-2`}>
                <CardHeader className={scheme.bgColor}>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className={`h-5 w-5 ${scheme.iconColor}`} />
                    <span className={scheme.textColor}>
                      Patient Information
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 bg-white">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Full Name
                    </Label>
                    <p className="text-lg font-semibold">
                      {result.patientInfo.name} {result.patientInfo.surname}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Age
                      </Label>
                      <p className="text-lg font-semibold">
                        {result.patientInfo.age} years
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Gender
                      </Label>
                      <p className="text-lg font-semibold capitalize">
                        {result.patientInfo.gender}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scan Details */}
              <Card className={`${scheme.borderColor} border-2`}>
                <CardHeader className={scheme.bgColor}>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className={`h-5 w-5 ${scheme.iconColor}`} />
                    <span className={scheme.textColor}>Scan Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Scan Type
                      </Label>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold">
                          {result.scanType.toUpperCase()}
                        </p>
                        <Badge className={scheme.badgeColor}>
                          {result.scanType === "mri" ? "MRI" : "Spiral"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Analysis Date
                      </Label>
                      <p className="font-semibold">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Processing Time
                      </Label>
                      <p className="font-semibold">{result.processingTime}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        AI Model
                      </Label>
                      <p className="font-semibold">
                        {result.scanType === "mri"
                          ? "Parkinsons Detect-MRI"
                          : "Parkinsons Detect-Spiral"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Scan Image */}
            <div className="space-y-6">
              <Card className={`${scheme.borderColor} border-2`}>
                <CardHeader className={scheme.bgColor}>
                  <CardTitle className="flex items-center space-x-2">
                    <ScanIcon className={`h-5 w-5 ${scheme.iconColor}`} />
                    <span className={scheme.textColor}>
                      {result.scanType.toUpperCase()} Scan Analysis
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={result.imageUrl || "/placeholder.svg"}
                      alt={`${result.scanType.toUpperCase()} Scan`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Full Width Diagnosis Results */}
          <Card className={`mt-8 ${scheme.borderColor} border-2`}>
            <CardHeader className={scheme.bgColor}>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className={`h-5 w-5 ${scheme.iconColor}`} />
                <span className={scheme.textColor}>Diagnosis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="text-center py-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  {result.diagnosis === "detected" ? (
                    <>
                      <AlertTriangle className="h-8 w-8 text-orange-500" />
                      <Badge className="text-lg px-4 py-2 bg-red-500 hover:bg-red-500 text-white">
                        Parkinson's Disease: DETECTED
                      </Badge>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <Badge className="text-lg px-4 py-2 bg-green-500 hover:bg-green-500 text-white">
                        Parkinson's Disease: NOT DETECTED
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-gray-600 mb-6">
                  Our specialized {result.scanType.toUpperCase()} AI model has
                  analyzed the scan and{" "}
                  {result.diagnosis === "detected"
                    ? "detected patterns consistent with"
                    : "found no significant patterns indicating"}{" "}
                  Parkinson's disease.
                </p>
                <div
                  className={`${scheme.bgColor} ${scheme.borderColor} border rounded-lg p-4 max-w-2xl mx-auto`}
                >
                  <h3 className={`font-semibold ${scheme.textColor} mb-2`}>
                    {result.scanType === "mri"
                      ? "MRI Analysis Notice"
                      : "Spiral Scan Analysis Notice"}
                  </h3>
                  <p className={`text-sm ${scheme.textColor}`}>
                    This is an AI-assisted preliminary analysis using{" "}
                    {result.scanType.toUpperCase()} imaging. Please consult with
                    a qualified neurologist for proper diagnosis and treatment
                    recommendations.
                    {result.scanType === "mri"
                      ? " MRI-based analysis provides detailed structural information."
                      : " Spiral scan analysis focuses on dynamic movement patterns."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
