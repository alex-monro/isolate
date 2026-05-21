"use client";

import UploadZone from "@/components/UploadZone";
import { useState } from "react";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div
      className="flex flex-col items-center justify-center gap-12 pt-24 "
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      <h1 className="font-black italic text-5xl tracking-tightest">
        Stem Splitter
      </h1>
      <p className="text-xl max-w-2xl text-center">
        Upload an audio track and get vocals, drums, bass, and melody separated.
      </p>
      <div className="mt-12 w-full">
        <UploadZone setAudioFile={setAudioFile} />
      </div>
    </div>
  );
}
