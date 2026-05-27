"use client";

import { Download, Music } from "lucide-react";
import { useRef, useState } from "react";

const UploadZone = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const input = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleUploadClick = () => {
    input.current?.click();
  };

  return (
    <>
      <img
        src="/heading-upload.svg"
        alt="Stem.Split"
        className="h-30 object-contain"
        style={{ mixBlendMode: "multiply" }}
      />
      <p className="text-xl text-neutral-700 max-w-md text-center">
        Upload an audio file and get vocals, drums, bass, and melody separated.
      </p>
      <div
        onClick={handleUploadClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onFileSelect(file);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleUploadClick();
        }}
        className={`group relative ${isDragging ? "scale-[1.02] bg-neutral-50" : ""} transition-all duration-200 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-neutral-500 hover:border-neutral-700 hover:bg-neutral-50 w-full max-w-4xl mx-auto py-24 md:py-32 rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-black`}
      >
        {/* corner ticks */}
        <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-neutral-400 group-hover:border-neutral-950 transition-colors rounded-tl-sm" />
        <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-neutral-400 group-hover:border-neutral-950 transition-colors rounded-tr-sm" />
        <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-neutral-400 group-hover:border-neutral-950 transition-colors rounded-bl-sm" />
        <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-neutral-400 group-hover:border-neutral-950 transition-colors rounded-br-sm" />

        <input
          type="file"
          accept="audio/*"
          className="hidden"
          ref={input}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${isDragging ? "bg-neutral-950" : "bg-neutral-100 group-hover:bg-neutral-950"}`}
        >
          {isDragging ? (
            <Download className="w-6 h-6 text-white" />
          ) : (
            <Music className="w-6 h-6 text-neutral-600 group-hover:text-white transition-colors duration-200" />
          )}
        </div>
        <p className="mt-4 text-md font-medium text-neutral-700">
          {isDragging ? (
            "Drop your audio file here!"
          ) : (
            <>
              <span className="md:hidden">Tap to add an audio file</span>
              <span className="hidden md:inline">
                Click or drag an audio file here
              </span>
            </>
          )}
        </p>
        <p className="mt-1 text-sm text-neutral-600">MP3, WAV, FLAC</p>
      </div>
    </>
  );
};

export default UploadZone;
