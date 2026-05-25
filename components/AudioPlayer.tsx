"use client";

import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";
import { Play, Pause } from "lucide-react";

const AudioPlayer = ({ url }: { url: string }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws) => {
    setWavesurfer(ws);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <button
        onClick={onPlayPause}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-white" />
        ) : (
          <Play className="w-4 h-4 ml-0.5 fill-white" />
        )}
      </button>

      <div className="flex-1">
        <WavesurferPlayer
          height={75}
          waveColor="#000000"
          progressColor="#cbcbcb"
          url={url}
          barWidth={4}
          barGap={1}
          barRadius={2}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
