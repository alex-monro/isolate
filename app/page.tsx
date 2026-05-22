"use client";

import UploadZone from "@/components/UploadZone";
import StemSelector from "@/components/StemSelector";
import { useState } from "react";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div
      className=""
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      {audioFile ? (
        <StemSelector audioFile={audioFile} />
      ) : (
        <UploadZone setAudioFile={setAudioFile} />
      )}
    </div>
  );
}
