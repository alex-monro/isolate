import React from "react";

const Loader = ({ audioFile }: { audioFile: string }) => {
  const barCount = 5;
  return (
    <div
      className="w-full min-h-full flex flex-col items-center justify-center gap-12"
      role="status"
      aria-label="Loading"
    >
      <div className="flex gap-2">
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            className="loading w-2 h-12 bg-black rounded"
            style={{ animationDelay: `${i * 0.15}s` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-5xl font-black tracking-tight">Splitting Your track</p>
      <span>{audioFile}</span>
      <p className="text-xl max-w-2xl text-center">
        This may take a few moments depending on the length of your track and
        the number of stems selected. Thanks for your patience!
      </p>
    </div>
  );
};

export default Loader;
