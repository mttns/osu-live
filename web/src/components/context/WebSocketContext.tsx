"use client";
import { useWebSocket } from "@/lib/useWebSocket";
import { Score } from "osu-live";
import { createContext, ReactNode } from "react";

export const WebSocketContext = createContext<{
  connections: number;
  healthy: boolean | null | undefined;
  scores: Score[];
  ws: WebSocket | null | undefined;
}>({ connections: 0, healthy: undefined, scores: [], ws: undefined });

export const WebSocketContextProvider = function WebSocketContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "");

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
