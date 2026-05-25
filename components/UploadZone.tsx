"use client";

import { Download } from "lucide-react";
import { Music } from "lucide-react";
import { useRef, useState } from "react";

const UploadZone = ({
  setAudioFile,
}: {
  // Take this funtion as a propt. say what type of file is expected and what it should return
  setAudioFile: (audioFile: File) => void;
}) => {
  const input = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleUploadClick = () => {
    input.current?.click();
  };

  return (
    // This is the upload zone. I used a ref to make sure that when the user clicks on the div, it actually triggers the input properties
    <>
      <div className="w-full min-h-full flex flex-col items-center justify-center gap-12">
        <h1 className="font-black italic text-5xl tracking-tightest">
          Stem Splitter
        </h1>
        <p className="text-xl max-w-2xl text-center">
          Upload an audio track and get vocals, drums, bass, and melody
          separated.
        </p>
        <div className="mt-12 w-full">
          <div
            onClick={handleUploadClick}
            //over ride the default browser behavior
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            //on Drop access the file
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                setAudioFile(file);
              }
            }}
            className={` ${isDragging ? "scale-[1.05]" : ""} transition-transform cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-black w-full max-w-4xl mx-auto py-30 rounded-4xl`}
          >
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              id="file-upload"
              ref={input}
              //This Handles when someone actually clicks to add an audio file
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAudioFile(file);
                }
              }}
            />

            {isDragging ? (
              <Download className="w-8 h-8 " />
            ) : (
              <Music className="w-8 h-8 " />
            )}
            <p className="mt-4 text-lg font-bold">
              {isDragging
                ? "Drop your audio file here!"
                : "Click or drag an audio file here"}
            </p>
            <p className="mt-4 text-md text-gray-700">
              Supported formats: MP3, WAV, FLAC
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadZone;
