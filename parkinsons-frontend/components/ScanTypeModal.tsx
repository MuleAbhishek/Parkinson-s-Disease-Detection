"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap } from "lucide-react";
import type { ScanType } from "@/types";

interface ScanTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScanType: (scanType: ScanType) => void;
}

export default function ScanTypeModal({
  isOpen,
  onClose,
  onSelectScanType,
}: ScanTypeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">
            Choose Your Scan Type
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
            onClick={() => onSelectScanType("mri")}
          >
            <CardHeader className="text-center">
              <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">MRI Scan</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Magnetic Resonance Imaging analysis for detailed brain structure
                examination and Parkinson's detection.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Select MRI Analysis
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300"
            onClick={() => onSelectScanType("spiral")}
          >
            <CardHeader className="text-center">
              <Zap className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Spiral Scan</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Spiral imaging analysis for dynamic brain activity patterns and
                movement disorder detection.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-6">
                Select Spiral Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Not sure which scan type to choose? Consult with your healthcare
            provider.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
