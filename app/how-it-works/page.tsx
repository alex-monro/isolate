export default function HowItWorksPage() {
  return (
    <div className="w-full max-w-5xl mx-auto flex gap-24 flex-col px-8">
      <h1 className="text-4xl font-bold text-center mb-8">How It Works</h1>
      <div className="">
        <h2 className="text-2xl font-bold">Upload Your Audio</h2>
        <p className="text-neutral-900 mt-4 text-lg">
          Start by uploading your audio file. We support MP3, WAV, FLAC, and
          more.
        </p>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold">Select Your Stems</h2>
        <p className="text-neutral-900 mt-4 text-lg">
          Choose which stems you want to download. You can select individual
          instruments or entire groups.
        </p>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold">Ai Procceses the audio </h2>
        <p className="text-neutral-900 mt-4 text-lg">
          Start by uploading your audio file. We support MP3, WAV, FLAC, and
          more.
        </p>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold">Upload Your Audio</h2>
        <p className="text-neutral-900 mt-4 text-lg">
          Download your separated stems as high-quality audio files. Use them
          for remixing, practicing, karaoke, music production, or any creative
          project.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">The Technology</h3>
        <p className="text-neutral-900 mt-4 text-lg">
          Stem.Split uses advanced deep learning models trained on thousands of
          songs to accurately separate audio sources. Our technology can
          distinguish between vocals, drums, bass, and melodic elements with
          precision that rivals professional audio engineering software.
        </p>
      </div>
    </div>
  );
}
