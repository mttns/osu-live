"use client";
import { memo, useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export const ScoreTime = memo(function ScoreTime({
  endedAt,
}: {
  endedAt: number;
}) {
  const now = useContext(TimerContext);
  const secAgo = Math.floor((now - endedAt) / 1000);

  return <>{secAgo}s</>;
});
