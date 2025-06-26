"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Trash2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getSavedResults,
  deleteSavedResult,
  clearAllSavedResults,
} from "@/lib/storage";
import { toast } from "sonner";
import Image from "next/image";
import type { SavedResult } from "@/types";

interface SavedResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewResult: (result: SavedResult) => void;
}

export default function SavedResultsModal({
  isOpen,
  onClose,
  onViewResult,
}: SavedResultsModalProps) {
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadSavedResults();
    }
  }, [isOpen]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Saved Results</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">{savedResults.length} saved result(s)</p>
          {savedResults.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading saved results...</div>
        ) : savedResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No saved results found.</p>
            <p className="text-sm mt-2">
              When you save analysis results, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedResults.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image thumbnail */}
                    <div className="relative w-full sm:w-32 h-32">
                      <Image
                        src={result.imageUrl || "/placeholder.svg"}
                        alt={`${result.scanType.toUpperCase()} Scan`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Result details */}
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {result.scanType === "mri" ? (
                              <Brain className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Zap className="h-4 w-4 text-purple-600" />
                            )}
                            <span className="font-semibold">
                              {result.patientInfo.name}{" "}
                              {result.patientInfo.surname}
                            </span>
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
                          <p className="text-sm text-gray-500 mb-2">
                            Saved on: {formatDate(result.savedAt)}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                result.diagnosis === "detected"
                                  ? "destructive"
                                  : "outline"
                              }
                            >
                              {result.diagnosis === "detected"
                                ? "Parkinson's Detected"
                                : "No Parkinson's Detected"}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {result.confidence}% confidence
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewResult(result)}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
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
      </DialogContent>
    </Dialog>
  );
}
