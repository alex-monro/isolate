import UploadZone from "@/components/UploadZone";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 pt-24 ">
      <h1 className="font-black italic text-5xl tracking-tightest">
        Stem Splitter
      </h1>
      <p className="text-xl max-w-2xl text-center">
        Upload an audio track and get vocals, drums, bass, and melody separated.
      </p>
      <div className="mt-12 w-full">
        <UploadZone />
      </div>
    </div>
  );
}
