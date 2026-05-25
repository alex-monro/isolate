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

  return (
    <div className="w-full">
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
        />
      ) : audioFile ? (
        <StemSelector
          audioFile={audioFile}
          selectedStems={selectedStems}
          setSelectedStems={setSelectedStems}
          setIsProcessing={setIsProcessing}
          setStemResults={setStemResults}
        />
      ) : (
        <UploadZone setAudioFile={setAudioFile} />
      )}
    </div>
  );
}
