import { Download } from "lucide-react";

const UploadZone = () => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-black w-full max-w-4xl mx-auto py-30 rounded-4xl">
      <input type="file" accept="audio/*" className="hidden" id="file-upload" />
      <Download className="w-8 h-8 " />
      <p className="mt-4 text-lg font-bold">Drop your audio file here.</p>
      <p className="mt-4 text-md text-gray-700">
        Supported formats: MP3, WAV, FLAC
      </p>
    </div>
  );
};

export default UploadZone;
