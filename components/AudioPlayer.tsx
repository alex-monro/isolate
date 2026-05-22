"use client";

import WavesurferPlayer from "@wavesurfer/react";
import { useState, useMemo } from "react";
import { Play, Pause, Music } from "lucide-react";

const AudioPlayer = ({ audioFile }: { audioFile: File }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = useMemo(() => URL.createObjectURL(audioFile), [audioFile]);

  const onReady = (ws) => {
    setWavesurfer(ws);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-base font-semibold text-black mb-3">
        <Music className="w-5 h-5" />
        <span className="truncate">{audioFile.name}</span>
      </div>
      <div className="flex items-center gap-4">
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
            url={audioUrl}
            barWidth={4}
            barGap={1}
            barRadius={2}
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
