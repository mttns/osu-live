"use client";
import { useInterval } from "@/lib/useInterval";
import { createContext, ReactNode, useState } from "react";

export const TimerContext = createContext<number>(Date.now());

export default function TimerProvider({ children }: { children: ReactNode }) {
  const [timer, setTimer] = useState(Date.now());

  useInterval(() => {
    setTimer(Date.now());
  }, 1000);

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
}
