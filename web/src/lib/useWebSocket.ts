"use client";

import { useEffect, useState } from "react";
import { APIData, Score } from "osu-live";

export const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>();
  const [connections, setConnections] = useState<number>(0);
  const [healthy, setHealthy] = useState<boolean | null>();
  const [socketIsRetrying, setSocketIsRetrying] = useState<boolean>();
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    function connectSocket() {
      if (socketIsRetrying) {
        setSocketIsRetrying(false);
      }

      const socket = new WebSocket(url);
      setWs(socket);

      socket.onopen = () => {
        socket.send("connect");
      };

      socket.onerror = () => {
        setSocketIsRetrying(true);
        setHealthy(undefined);
      };

      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data as string) as APIData;
        const newScores = data.scores.map((score) => ({
          ...score,
          ingress: Date.now(),
        }));

        setConnections(data.connections);
        setHealthy(data.healthy);
        setScores((prev) => [
          ...prev,
          ...newScores.filter(
            (score) => !prev.some((prevScore) => prevScore.id === score.id)
          ),
        ]);
      };

      return socket;
    }

    if (
      ws?.readyState === WebSocket.CONNECTING ||
      ws?.readyState === WebSocket.OPEN
    ) {
      return;
    }

    if (socketIsRetrying === undefined) {
      connectSocket();
      return;
    }

    if (socketIsRetrying) {
      const timeout = setTimeout(connectSocket, 3000);
      return () => {
        clearTimeout(timeout);
        ws?.close();
      };
    }

    return () => {
      ws?.close();
    };
  }, [ws, url, socketIsRetrying]);

  return { ws, connections, healthy, scores };
};
