import z from "zod";

export const WebAPIUser = z.object({
  id: z.number(),
  username: z.string(),
});
