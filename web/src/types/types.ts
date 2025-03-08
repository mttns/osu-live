declare module "osu-live" {
  export type APIData = {
    connections: number;
    healthy: boolean;
    scores: Score[];
  };

  type TransformedBeatmapSet = {
    artist: string;
    id: number;
    status: string;
    title: string;
    user_id: number;
  };

  type TransformedBeatmap = {
    beatmapset_id: number;
    difficulty_rating: number;
    id: number;
    mode: string;
    status: string;
    user_id: number;
    convert: boolean;
    beatmapset: TransformedBeatmapSet;
    owners: unknown[];
    version: string;
    ranked: -2 | -1 | 0 | 1 | 2 | 3 | 4;
  };

  type Score = {
    beatmap_id: number;
    ended_at: number;
    mods: { acronym: string }[];
    pp: number | null;
    user: {
      id: number;
      username: string | null;
    };
    id: number;
    beatmap: TransformedBeatmap | null;
    rulesetId: number;
    // 0 = standard, 1 = taiko, 2 = fruits, 3 = mania
  } & { ingress: number };

  type FilterMap = {
    minPp?: number;
    maxPp?: number;
    modCombo?: string;
    strictModCombo?: boolean;
    mapId?: number;
    mapsetId?: number;
    usernameFilter?: string;
    beatmapFilter?: string;
    rulesets: Set<number>;
  };
}
