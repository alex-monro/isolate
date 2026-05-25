"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import StemSelector from "@/components/StemSelector";
import Loader from "@/components/Loader";
import StemResults from "@/components/StemResults";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedStems, setSelectedStems] = useState<string[]>([
    "Vocals",
    "Drums",
    "Bass",
    "Melody",
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  // holds the stem URLs when done — its existence means "results are ready"
  const [stemResults, setStemResults] = useState<Record<
    string,
    string | null
  > | null>(null);

  const reset = () => {
    setAudioFile(null);
    setSelectedStems(["Vocals", "Drums", "Bass", "Melody"]);
    setStemResults(null);
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-12 pt-16">
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
          setSelectedStems={setSelectedStems}
          setIsProcessing={setIsProcessing}
          setStemResults={setStemResults}
          reset={reset}
        />
      ) : (
        <UploadZone setAudioFile={setAudioFile} />
      )}
    </div>
  );
}
