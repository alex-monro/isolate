import AudioPlayer from "@/components/AudioPlayer";
import { useState, SetStateAction, Dispatch } from "react";
import { Mic2, Drum, Speaker, Music } from "lucide-react";

const StemSelector = ({
  audioFile,
  selectedStems,
  setSelectedStems,
  setIsProcessing,
}: {
  audioFile: File;
  selectedStems: string[];
  // Typed as Dispatch<SetStateAction> to explicitly tell TypeScript we're passing down a setter — which can accept both a direct value and a callback function
  setSelectedStems: Dispatch<SetStateAction<string[]>>;
  setIsProcessing: (isProcessing: boolean) => void;
}) => {
  const stems = [
    { name: "Vocals", icon: Mic2 },
    { name: "Drums", icon: Drum },
    { name: "Bass", icon: Speaker },
    { name: "Melody", icon: Music },
  ];

  // if selected stem is included in the stem array, filter the array to remove it and update it.
  const handleStemSelection = (stem: string) => {
    if (selectedStems.includes(stem)) {
      setSelectedStems((prev) => prev.filter((s) => s !== stem));
      //if not, add it onto the existing array of selected stems
    } else {
      setSelectedStems((prev) => [...prev, stem]);
    }
  };

  const splitStems = async () => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await fetch("/api/process", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
    setIsProcessing(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-12 mt-12">
        <h1 className="font-black italic text-5xl tracking-tightest">
          Stem Splitter
        </h1>

        <div className="w-full max-w-4xl">
          <AudioPlayer audioFile={audioFile} />
        </div>
        <h2 className="font-bold   tracking-tight text-3xl tracking-tightest">
          Select Stems to Extract
        </h2>
        <p className="text-xl tracking-tight ">
          Choose which stems you want. Each selection will be processed and
          available for download.
        </p>
        <div>
          {stems.map((stem) => (
            <button
              key={stem.name}
              className={`px-16 py-4 text-xl border border-black m-2 rounded-2xl border-2 transition-all duration-200  font-medium  ${selectedStems.includes(stem.name) ? " bg-black text-white ring-4 ring-black ring-offset-2" : "bg-white text-black"}`}
              //Run this function on click
              onClick={() => handleStemSelection(stem.name)}
            >
              <span className="flex items-center justify-center">
                {stem.name} <stem.icon className="w-5 h-5 inline ml-2" />
              </span>
            </button>
          ))}
        </div>
        <div>
          <button
            className={`px-24 w-85 flex-shrink-0  py-4 text-xl m-2 rounded-2xl  transition-all duration-200  font-medium tacking-tight ${selectedStems.length > 0 ? "text-white bg-black" : "bg-gray-200  text-gray-600"}`}
            disabled={selectedStems.length === 0}
            onClick={splitStems}
          >
            {selectedStems.length > 0
              ? `Process ${selectedStems.length} Stem${selectedStems.length > 1 ? "s" : ""}`
              : "Select Stems"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StemSelector;
