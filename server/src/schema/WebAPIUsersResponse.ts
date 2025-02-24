import z from "zod";
import { WebAPIUser } from "./WebAPIUser.js";

export const WebAPIUsersResponse = z.object({
  users: z.array(WebAPIUser),
});
