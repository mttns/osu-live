import z from "zod";
import { WebAPIScore } from "./WebAPIScore.js";

export const WebAPIScoresResponse = z.object({
  scores: z.array(WebAPIScore),
  cursor: z.object({ id: z.coerce.number() }),
  cursor_string: z.string(),
});
