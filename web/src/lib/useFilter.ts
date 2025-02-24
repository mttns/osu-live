"use client";

import { Score } from "osu-live";
import { useMemo } from "react";

const sanitizeRegex = /[#-.]|[[-^]|[?|{}]/g;

// naive implementation (aka this does not scale infinitely which is bad)
export function useScoreFilters(
  scores: Score[],
  filters: {
    minPp?: number;
    maxPp?: number;
    modCombo?: string;
    mapId?: number;
    mapsetId?: number;
    usernameFilter?: string;
    beatmapFilter?: string;
  }
) {
  return useMemo(() => {
    const {
      minPp,
      maxPp,
      modCombo,
      mapId,
      mapsetId,
      usernameFilter,
      beatmapFilter,
    } = filters;

    const beatmapFilterRegex =
      beatmapFilter !== undefined
        ? new RegExp(beatmapFilter.replace(sanitizeRegex, "\\$&"), "i")
        : undefined;

    return scores.filter((score) => {
      if (minPp !== undefined && Math.round(score.pp || 0) < minPp) {
        return false;
      }

      if (maxPp !== undefined && Math.round(score.pp || 0) > maxPp) {
        return false;
      }

      if (modCombo !== undefined) {
        const mods = new Set(score.mods.map(({ acronym }) => acronym));
        const rawFilterMods = [...modCombo.matchAll(/((\+|-)?[a-z]{2})/gi)].map(
          (a) => a[0].toUpperCase()
        );
        const isExact = modCombo.match(/"(.*?)"/) !== null;

        for (const [index, mod] of rawFilterMods.entries()) {
          if (mod.startsWith("-") || mod.startsWith("+")) {
            continue;
          }

          if (rawFilterMods[index - 1]?.startsWith("-")) {
            // if the previous mod is a negative mod, this mod should also be negative
            rawFilterMods[index] = `-${mod}`;
          } else if (rawFilterMods[index - 1]?.startsWith("+")) {
            // same with positive mods
            rawFilterMods[index] = `+${mod}`;
          } else {
            // otherwise it's positive by default
            rawFilterMods[index] = `+${mod}`;
          }
        }

        if (isExact) {
          for (const mod of mods) {
            if (
              rawFilterMods.find((filterMod) => mod === filterMod.slice(1)) ===
              undefined
            ) {
              return false;
            }
          }
        }

        for (const mod of rawFilterMods) {
          if (mod.startsWith("-") && mods.has(mod.slice(1))) {
            return false;
          } else if (mod.startsWith("+") && !mods.has(mod.slice(1))) {
            return false;
          }
        }

        return true;
      }

      if (mapId !== undefined && score.beatmap_id !== mapId) {
        return false;
      }

      if (mapsetId !== undefined && score.beatmap?.beatmapset_id !== mapsetId) {
        return false;
      }

      if (
        usernameFilter &&
        score.user.username?.toLowerCase() !== usernameFilter.toLowerCase() &&
        score.user.id.toString() !== usernameFilter
      ) {
        return false;
      }

      if (beatmapFilterRegex) {
        const beatmap = score.beatmap;

        if (!beatmap) {
          return false;
        }

        const set = beatmap.beatmapset;

        return (
          beatmap.id.toString() === beatmapFilter ||
          beatmap.beatmapset_id.toString() === beatmapFilter ||
          `${set.artist} - ${set.title} [${beatmap.version}]`.match(
            beatmapFilterRegex
          ) !== null
        );
      }

      return true;
    });
  }, [scores, filters]);
}
