"use client";

import { createContext, useContext, useRef } from "react";

type ResetContextType = {
  register: (fn: () => void) => void;
  call: () => void;
};

const ResetContext = createContext<ResetContextType>({
  register: () => {},
  call: () => {},
});

export const ResetProvider = ({ children }: { children: React.ReactNode }) => {
  const fn = useRef<(() => void) | null>(null);
  return (
    <ResetContext.Provider
      value={{ register: (f) => { fn.current = f; }, call: () => fn.current?.() }}
    >
      {children}
    </ResetContext.Provider>
  );
};

export const useReset = () => useContext(ResetContext);
