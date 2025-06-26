"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Trash2, ExternalLink, ArrowLeft } from "lucide-react";
import {
  getSavedResults,
  deleteSavedResult,
  clearAllSavedResults,
} from "@/lib/storage";
import Header from "@/components/Header";
import Image from "next/image";
import type { SavedResult } from "@/types";

import { toast, Toaster } from "sonner";

export default function SavedResultsPage() {
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadSavedResults();
  }, []);

  const loadSavedResults = () => {
    setIsLoading(true);
    const results = getSavedResults();
    setSavedResults(results);
    setIsLoading(false);
  };

  const handleDeleteResult = (id: string) => {
    deleteSavedResult(id);
    setSavedResults(savedResults.filter((result) => result.id !== id));
    toast.success("Result deleted", {
      description: "The saved result has been deleted.",
    });
  };

  const handleClearAll = () => {
    if (
      confirm(
        "Are you sure you want to delete all saved results? This action cannot be undone."
      )
    ) {
      clearAllSavedResults();
      setSavedResults([]);
      toast.success("All results cleared", {
        description: "All saved results have been deleted.",
      });
    }
  };

  const handleViewResult = (result: SavedResult) => {
    // Store the result in sessionStorage and navigate to results page
    sessionStorage.setItem("analysisResult", JSON.stringify(result));
    router.push("/results");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Saved Results
                </h1>
                <p className="text-gray-600">
                  {savedResults.length} saved analysis result(s)
                </p>
              </div>
            </div>

            {savedResults.length > 0 && (
              <Button variant="destructive" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Results
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading saved results...</p>
            </div>
          ) : savedResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Saved Results
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't saved any analysis results yet. When you complete
                  an analysis and save it, the results will appear here for easy
                  access.
                </p>
                <Button
                  onClick={() => router.push("/")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start New Analysis
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {savedResults.map((result) => (
                <Card
                  key={result.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Image thumbnail */}
                      <div className="relative w-full lg:w-48 h-48">
                        <Image
                          src={result.imageUrl || "/placeholder.svg"}
                          alt={`${result.scanType.toUpperCase()} Scan`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge
                            className={
                              result.scanType === "mri"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }
                          >
                            {result.scanType.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {/* Result details */}
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              {result.scanType === "mri" ? (
                                <Brain className="h-5 w-5 text-blue-600" />
                              ) : (
                                <Zap className="h-5 w-5 text-purple-600" />
                              )}
                              <h3 className="text-xl font-semibold text-gray-900">
                                {result.patientInfo.name}{" "}
                                {result.patientInfo.surname}
                              </h3>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="font-medium">
                                  {result.patientInfo.age} years
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="font-medium capitalize">
                                  {result.patientInfo.gender}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Saved</p>
                                <p className="font-medium text-sm">
                                  {formatDate(result.savedAt)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 mb-4">
                              <Badge
                                variant={
                                  result.diagnosis === "detected"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="text-sm"
                              >
                                {result.diagnosis === "detected"
                                  ? "Parkinson's Detected"
                                  : "No Parkinson's Detected"}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Processing time: {result.processingTime}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <Button
                              onClick={() => handleViewResult(result)}
                              className="flex items-center space-x-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View Details</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteResult(result.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Toaster />
    </div>
  );
}
