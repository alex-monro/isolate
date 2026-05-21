import { Download } from "lucide-react";
import { useRef } from "react";

const UploadZone = ({
  setAudioFile,
}: {
  setAudioFile: (audioFile: File) => void;
  // Take this funtion as a propt. say what type of file is expected and what it should return
}) => {
  const input = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    input.current?.click();
  };

  return (
    // This is the upload zone. I used a ref to make sure that when the user clicks on the div, it actually triggers the input properties
    <div
      onClick={handleUploadClick}
      //over ride the default browser behavior
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center border-2 border-dashed border-black w-full max-w-4xl mx-auto py-30 rounded-4xl"
    >
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        id="file-upload"
        ref={input}
      />
      <Download className="w-8 h-8 " />
      <p className="mt-4 text-lg font-bold">Drop your audio file here.</p>
      <p className="mt-4 text-md text-gray-700">
        Supported formats: MP3, WAV, FLAC
      </p>
    </div>
  );
};

export default UploadZone;
