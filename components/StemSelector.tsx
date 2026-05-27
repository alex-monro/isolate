"use client";

import AudioPlayer from "@/components/AudioPlayer";
import { useState, useMemo } from "react";
import { Mic2, Drum, Speaker, Music, ArrowLeft } from "lucide-react";

const StemSelector = ({
  audioFile,
  selectedStems,
  onStemToggle,
  onProcessingChange,
  onStemResults,
  reset,
}: {
  audioFile: File;
  selectedStems: string[];
  onStemToggle: (stem: string) => void;
  onProcessingChange: (processing: boolean) => void;
  onStemResults: (results: Record<string, string | null>) => void;
  reset: () => void;
}) => {
  const audioUrl = useMemo(() => URL.createObjectURL(audioFile), [audioFile]);

  const stems = [
    { name: "Vocals", icon: Mic2 },
    { name: "Drums", icon: Drum },
    { name: "Bass", icon: Speaker },
    { name: "Melody", icon: Music },
  ];

  const splitStems = async () => {
    onProcessingChange(true);
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await fetch("/api/process", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    onStemResults(data);
    onProcessingChange(false);
  };

  return (
    <>
      <button
        onClick={reset}
        className="fixed bottom-8 left-4 md:left-64 flex items-center gap-1 text-base font-medium text-neutral-700 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Pick a different file
      </button>
      <img
        src="/heading-select.svg"
        alt="Select your stems"
        className="h-30 object-contain"
        style={{ mixBlendMode: "multiply" }}
      />

      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-3">
          <Music className="w-4 h-4" />
          <span className="truncate">{audioFile.name}</span>
        </div>
        <AudioPlayer url={audioUrl} />
      </div>

      <p className="text-xl text-neutral-700 mx-auto text-center">
        Choose which stems to extract and download.
      </p>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-2 px-4 md:px-0 md:flex-row md:flex-wrap md:justify-center md:max-w-none">
        {stems.map((stem) => (
          <button
            key={stem.name}
            aria-pressed={selectedStems.includes(stem.name)}
            className={`w-full md:w-auto px-16 py-4 text-xl rounded-2xl border-2 transition-all duration-200 font-medium ${selectedStems.includes(stem.name) ? "bg-black text-white border-black ring-4 ring-black ring-offset-2" : "bg-white text-neutral-700 border-neutral-300"}`}
            onClick={() => onStemToggle(stem.name)}
          >
            <span className="flex items-center justify-center">
              {stem.name} <stem.icon className="w-5 h-5 inline ml-2" />
            </span>
          </button>
        ))}
      </div>
      <button
        className={`w-full max-w-sm mx-auto md:w-auto px-24 flex-shrink-0 py-4 text-xl rounded-2xl transition-all duration-200 font-medium tracking-tight ${selectedStems.length > 0 ? "text-white bg-black" : "bg-neutral-200 text-neutral-600"}`}
        disabled={selectedStems.length === 0}
        onClick={splitStems}
      >
        {selectedStems.length > 0
          ? `Process ${selectedStems.length} Stem${selectedStems.length > 1 ? "s" : ""}`
          : "Select Stems"}
      </button>
    </>
  );
};

export default StemSelector;
