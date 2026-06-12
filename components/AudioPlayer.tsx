"use client";

import WavesurferPlayer from "@wavesurfer/react";
import type WaveSurfer from "wavesurfer.js";
import { useState } from "react";
import { Play, Pause } from "lucide-react";

const AudioPlayer = ({ url }: { url: string }) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="flex items-center gap-4 w-full border-2 border-neutral-200 rounded-2xl px-4 py-3">
      <button
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-white" />
        ) : (
          <Play className="w-4 h-4 ml-0.5 fill-white" />
        )}
      </button>

      <div className="flex-1">
        <WavesurferPlayer
          height={80}
          waveColor="#d4d4d4"
          progressColor="#000000"
          url={url}
          barWidth={5}
          barGap={2}
          barRadius={3}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
