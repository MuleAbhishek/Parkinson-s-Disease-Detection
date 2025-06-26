"use client";

import { Brain, History } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onViewSavedResults?: () => void;
}

export default function Header({ onViewSavedResults }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">
            Parkinsons Detect
          </span>
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Research
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
          {onViewSavedResults && (
            <Button
              variant="outline"
              onClick={onViewSavedResults}
              className="flex items-center space-x-2"
            >
              <History className="h-4 w-4" />
              <span>Saved Results</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
