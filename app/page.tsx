"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import StemSelector from "@/components/StemSelector";
import Loader from "@/components/Loader";
import StemResults from "@/components/StemResults";
export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedStems, setSelectedStems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  // holds the stem URLs when done — its existence means "results are ready"
  const [stemResults, setStemResults] = useState<Record<
    string,
    string | null
  > | null>(null);

  const reset = () => {
    setAudioFile(null);
    setSelectedStems([]);
    setStemResults(null);
  };

  const handleFileSelect = (file: File) => setAudioFile(file);

  const handleStemToggle = (stem: string) => {
    setSelectedStems((prev) =>
      prev.includes(stem) ? prev.filter((s) => s !== stem) : [...prev, stem],
    );
  };

  const handleProcessingChange = (processing: boolean) =>
    setIsProcessing(processing);

  const handleStemResults = (results: Record<string, string | null>) =>
    setStemResults(results);

  return (
    <div className="w-full flex flex-col items-center gap-16 py-16">
      {isProcessing ? (
        <Loader audioFile={audioFile?.name || ""} />
      ) : stemResults ? (
        <StemResults
          stemResults={Object.fromEntries(
            Object.entries(stemResults).filter(([stem]) =>
              selectedStems.some((s) => s.toLowerCase() === stem.toLowerCase()),
            ),
          )}
          fileName={audioFile?.name || ""}
          reset={reset}
        />
      ) : audioFile ? (
        <StemSelector
          audioFile={audioFile}
          selectedStems={selectedStems}
          onStemToggle={handleStemToggle}
          onProcessingChange={handleProcessingChange}
          onStemResults={handleStemResults}
          reset={reset}
        />
      ) : (
        <UploadZone onFileSelect={handleFileSelect} />
      )}
    </div>
  );
}
