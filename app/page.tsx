"use client";

import UploadZone from "@/components/UploadZone";
import StemSelector from "@/components/StemSelector";
import StemResults from "@/components/StemResults";
import { useState } from "react";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedStems, setSelectedStems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      {isProcessing ? (
        <StemResults />
      ) : audioFile ? (
        <StemSelector
          audioFile={audioFile}
          selectedStems={selectedStems}
          setSelectedStems={setSelectedStems}
          setIsProcessing={setIsProcessing}
        />
      ) : (
        <UploadZone setAudioFile={setAudioFile} />
      )}
    </div>
  );
}
