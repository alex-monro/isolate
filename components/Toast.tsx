"use client";

import { useEffect } from "react";

const Toast = ({ message, onDismiss }: { message: string; onDismiss: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-8 left-0 md:left-56 right-0 flex justify-center pointer-events-none z-50">
      <p className="pointer-events-auto bg-black text-white text-sm font-medium px-5 py-3 rounded-2xl animate-fade-up">
        {message}
      </p>
    </div>
  );
};

export default Toast;
