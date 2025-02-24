import z from "zod";
import { WebAPIBeatmap } from "./WebAPIBeatmap.js";

export const WebAPIBeatmapsResponse = z.object({
  beatmaps: z.array(WebAPIBeatmap),
});
