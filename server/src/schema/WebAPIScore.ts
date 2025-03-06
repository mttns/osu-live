import z from "zod";

export const WebAPIScore = z.object({
  accuracy: z.number(),
  beatmap_id: z.number(),
  // best_id: unknown | null;
  // build_id: unknown | null;
  //   classic_total_score: number;
  //   current_user_attributes: { pin: unknown | null } | null;
  ended_at: z.string(),
  //   has_replay: boolean;
  id: z.number(),
  //   is_perfect_combo: boolean;
  //   legacy_perfect: boolean;
  //   legacy_score_id: number;
  //   legacy_total_score: number;
  //   max_combo: number;
  //   maximum_statistics: unknown;
  mods: z.array(z.object({ acronym: z.string() })),
  //   passed: boolean;
  pp: z.number().nullable(),
  //   preserve: boolean;
  //   processed: boolean;
  rank: z.string(),
  //   ranked: boolean;
  //   replay: boolean;
  ruleset_id: z.number(),
  //   started_at: unknown | null;
  //   statistics: unknown;
  //   total_score: number;
  //   total_score_without_mods: number;
  //   type: string;
  user_id: z.number(),
});
