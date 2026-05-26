"use client";

import React from "react";
import AudioPlayer from "./AudioPlayer";
import { Mic2, Drum, Speaker, Music, Download, ArrowLeft } from "lucide-react";

const stemIcons: Record<string, React.ElementType> = {
  vocals: Mic2,
  drums: Drum,
  bass: Speaker,
  melody: Music,
  guitar: Music,
  piano: Music,
  other: Music,
};

const stemNotes: Record<string, string> = {
  vocals: "Lead and backing vocals",
  drums: "Kick, snare & cymbals",
  bass: "Bass guitar & low end",
  melody: "Melodic instruments",
  guitar: "Electric & acoustic guitar",
  piano: "Piano & keys",
  other: "Remaining instruments",
};

const StemResults = ({
  stemResults,
  fileName,
  reset,
}: {
  stemResults: Record<string, string | null>;
  fileName: string;
  reset: () => void;
}) => {
  const downloadStem = async (url: string, stem: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${stem.toLowerCase()}_${fileName.toLowerCase()}.wav`;
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  const handleDownloadAll = () => {
    Object.entries(stemResults).forEach(([stem, url]) => {
      if (url) downloadStem(url, stem);
    });
  };
  return (
    <>
      <button
        onClick={reset}
        className="fixed bottom-8 left-4 md:left-64 flex items-center gap-1 text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Pick a different file
      </button>
    <div className="w-full flex flex-col items-center gap-12 fade-up">

      <img
        src="/heading-ready.svg"
        alt="Your Stems are Ready"
        className="h-20 object-contain"
        style={{ mixBlendMode: "multiply" }}
      />
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(stemResults).map(([stem, url]) => {
          const key = stem.toLowerCase();
          const Icon = stemIcons[key] ?? Music;
          const note = stemNotes[key];
          return (
            <div
              key={stem}
              className="border-2 border-neutral-200 rounded-2xl p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    className="w-5 h-5 flex-shrink-0 text-neutral-700"
                    aria-hidden="true"
                  />
                  <p className="font-bold text-lg leading-tight capitalize">
                    {stem}
                  </p>
                </div>
                {url && (
                  <button
                    onClick={() => downloadStem(url, stem)}
                    aria-label={`Download ${stem}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-800"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              {url ? (
                <AudioPlayer url={url} />
              ) : (
                <p className="text-neutral-600 text-base">Not available</p>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={handleDownloadAll}
        className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-2xl font-medium text-base"
      >
        <Download className="w-5 h-5" />
        Download All Stems
      </button>
    </div>
    </>
  );
};

export default StemResults;
