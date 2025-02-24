import z from "zod";
import { WebAPIBeatmapSet } from "./WebAPIBeatmapSet.js";

export const WebAPIBeatmap = z.object({
  beatmapset_id: z.number(),
  difficulty_rating: z.number(),
  id: z.number(),
  mode: z.string(),
  status: z.string(),
  user_id: z.number(),
  //   convert: z.boolean(),
  version: z.string(),
  beatmapset: WebAPIBeatmapSet,
  // owners: unknown[];
  ranked: z.number(),
});
