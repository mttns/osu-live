import z from "zod";

export const WebAPITokenResponse = z.object({
  token_type: z.string(),
  expires_in: z.number(),
  access_token: z.string(),
});
