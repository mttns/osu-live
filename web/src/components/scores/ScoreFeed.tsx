"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ScoreFeed.module.css";
import { useScoreFilters } from "@/lib/useFilter";
import { ScoreCard } from "./ScoreCard";
import { FilterContext } from "../context/FilterContext";
import { WebSocketContext } from "../context/WebSocketContext";

export function ScoreFeed() {
  const { scores } = useContext(WebSocketContext);
  const { filters } = useContext(FilterContext);
  const [scoreIndex, setScoreIndex] = useState<number>(0);
  const [didRefocus, setDidRefocus] = useState<boolean>(false);

  const filteredScores = useScoreFilters(scores.slice(0, scoreIndex), filters);
  const displayedScores = useMemo(
    () => filteredScores.slice(-30).reverse(),
    [filteredScores]
  );

  useEffect(() => {
    const focus = () => {
      setDidRefocus(true);
    };

    document.addEventListener("visibilitychange", focus);
    return () => document.removeEventListener("visibilitychange", focus);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (didRefocus && scoreIndex <= scores.length - 60) {
        setScoreIndex(scores.length - 1 - 30);
        setDidRefocus(false);
        return;
      } else if (didRefocus) {
        setDidRefocus(false);
      }

      const nextScore = scores[scoreIndex];

      if (!nextScore) {
        return;
      }

      setScoreIndex(scoreIndex + 1);
    }

    const interval = setInterval(handleScroll, 20);
    return () => clearInterval(interval);
  }, [scoreIndex, scores, didRefocus]);

  return (
    <div className={styles.scores}>
      {displayedScores.map((s) => (
        <ScoreCard key={s.id} score={s} />
      ))}
    </div>
  );
}
