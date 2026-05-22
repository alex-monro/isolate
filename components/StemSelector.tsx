import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";

const StemSelector = ({ audioFile }: { audioFile: File }) => {
  const [selectedStems, setSelectedStems] = useState<string[]>([]);
  const stems = ["Vocals", "Drums", "Bass", "Melody"];

  // if selected stem is included in the stem array, filter the array to remove it and update it.
  const handleStemSelection = (stem: string) => {
    if (selectedStems.includes(stem)) {
      setSelectedStems((prev) => prev.filter((s) => s !== stem));
      //if not, add it onto the existing array of selected stems
    } else {
      setSelectedStems((prev) => [...prev, stem]);
    }
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
        <div className="">
          {stems.map((stem) => (
            <button
              key={stem}
              className={`px-16 py-4 text-xl border border-black m-2 rounded-2xl border-2 font-medium tacking-tight ${selectedStems.includes(stem) ? "bg-black text-white" : "bg-white text-black"}`}
              //Run this function on click
              onClick={() => handleStemSelection(stem)}
            >
              {stem}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StemSelector;
