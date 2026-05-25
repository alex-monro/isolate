import { useEffect, useState } from "react";

const Loader = ({ audioFile }: { audioFile: string }) => {
  const barCount = 5;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkpoints = [
      { target: 40, duration: 8000 },
      { target: 60, duration: 12000 },
      { target: 80, duration: 20000 },
      { target: 99, duration: 90000 },
    ];

    let current = 0;
    let start = 0;
    let startProgress = 0;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const { target, duration } = checkpoints[current];
      const t = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(startProgress + (target - startProgress) * eased);

      if (t < 1) {
        animFrame = requestAnimationFrame(animate);
      } else if (current < checkpoints.length - 1) {
        startProgress = target;
        start = 0;
        current++;
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

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
      <p className="text-5xl font-black tracking-tight">Splitting Your Track</p>
      <p className="text-base text-gray-600">{audioFile}</p>
      <div className="w-full max-w-md flex flex-col gap-2">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-right">{Math.round(progress)}%</p>
      </div>
      <p className="text-xl max-w-2xl text-center">
        This may take a few moments depending on the length of your track and
        the number of stems selected. Thanks for your patience!
      </p>
    </div>
  );
};

export default Loader;
