"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultsPage from "@/components/ResultsPage";
import { Toaster } from "sonner";
import type { AnalysisResult } from "@/types";

export default function Results() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get result data from sessionStorage (set when API call completes)
    const resultData = sessionStorage.getItem("analysisResult");

    if (resultData) {
      try {
        const parsedResult = JSON.parse(resultData);
        setResult(parsedResult);
      } catch (error) {
        console.error("Error parsing result data:", error);
        router.push("/");
      }
    } else {
      // No result data, redirect to home
      router.push("/");
    }

    setIsLoading(false);
  }, [router]);

  const handleNewAnalysis = () => {
    // Clear the session storage and redirect to home
    sessionStorage.removeItem("analysisResult");
    router.push("/");
  };

  const handleViewSavedResults = () => {
    router.push("/saved-results");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No results found</p>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ResultsPage
        result={result}
        onNewAnalysis={handleNewAnalysis}
        onViewSavedResults={handleViewSavedResults}
      />
      <Toaster />
    </>
  );
}
