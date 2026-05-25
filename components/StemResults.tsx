"use client";

import React from "react";
import AudioPlayer from "./AudioPlayer";
import { Mic2, Drum, Speaker, Music, Download } from "lucide-react";

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
}: {
  stemResults: Record<string, string | null>;
  fileName: string;
}) => {
  const handleDownload = async (url: string, stem: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const stemURl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = stemURl;
    link.download = `${stem.toLowerCase()}_${fileName.toLowerCase()}.wav`;
    link.click();
    URL.revokeObjectURL(stemURl);
  };
  return (
    <div className="w-full flex flex-col items-center gap-12">
      <h2 className="font-bold text-3xl tracking-tightest">Your Stems</h2>
      <div className="w-full max-w-6xl grid grid-cols-2 gap-6">
        {Object.entries(stemResults).map(([stem, url]) => {
          const key = stem.toLowerCase();
          const Icon = stemIcons[key] ?? Music;
          const note = stemNotes[key];
          return (
            <div
              key={stem}
              className="border-2 border-black rounded-2xl p-5 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg leading-tight capitalize">
                    {stem}
                  </p>
                  {note && <p className="text-md text-gray-600">{note}</p>}
                </div>
              </div>
              {url ? (
                <AudioPlayer url={url} />
              ) : (
                <p className="text-gray-400 text-base">Not available</p>
              )}
              {url && (
                <button
                  onClick={() => handleDownload(url, stem)}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-black text-white rounded-xl font-medium text-base"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StemResults;
