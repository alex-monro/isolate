export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Upload Your Audio",
      description:
        "Drag and drop your audio onto the upload zone, or click to browse your files.",
      bullets: [
        "Supports MP3, WAV, and FLAC formats",
        "Drag & drop or click to upload",
      ],
      image: "/audioupload.png",
      alt: "Upload your audio",
    },
    {
      number: "2",
      title: "Select Your Stems",
      description:
        "Choose which instruments you want isolated. Pick one or grab them all.",
      bullets: [
        "Vocals, drums, bass, and melody",
        "Select any combination",
      ],
      image: "/stem selection.png",
      alt: "Select your stems",
    },
    {
      number: "3",
      title: "AI Processes Your Audio",
      description:
        "Demucs analyzes the waveform of your audio and learns to tell each instrument apart. It then reconstructs each one as its own clean, isolated file.",
      bullets: [
        "Powered by Meta's Demucs model",
        "No GPU needed on your end",
      ],
      image: "/loader.png",
      alt: "AI processing",
    },
    {
      number: "4",
      title: "Download Your Results",
      description:
        "Get your separated stems as high-quality audio files, ready for remixing or practice.",
      bullets: [
        "High-quality audio output",
        "Download each stem individually",
      ],
      image: "/download stems.png",
      alt: "Download your stems",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-24 py-16">
      <div className="flex flex-col items-center gap-8 text-center">
        <img
          src="/logo.svg"
          alt="isolate"
          className="h-8 object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
        <h1 className="text-5xl font-black tracking-[-0.05em]">how it works</h1>
        <p className="text-lg text-neutral-600 max-w-xl">
          The simplest stem splitter out there. Upload your audio, pick your stems, and let the AI do the rest.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
          >
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-black text-white text-base font-black flex items-center justify-center flex-shrink-0">
                  {step.number}
                </span>
                <h2 className="text-2xl font-black tracking-[-0.04em]">
                  {step.title}
                </h2>
              </div>
              <p className="text-neutral-600 text-base leading-relaxed">
                {step.description}
              </p>
              <ul className="flex flex-col gap-2">
                {step.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm text-neutral-500"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="w-4 h-4 flex-shrink-0 text-black"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-[1.2]">
              <img
                src={step.image}
                alt={step.alt}
                className="w-full rounded-2xl border border-neutral-200"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-black tracking-[-0.05em]">Technology</h2>
        <p className="text-neutral-600 text-base leading-relaxed">
          isolate uses <span className="font-semibold text-black">Demucs</span>, an open-source model developed by Meta for audio source separation. It runs in the cloud, so there is nothing to install and no powerful hardware required on your end. isolate is completely free to use.
        </p>
      </div>
    </div>
  );
}
