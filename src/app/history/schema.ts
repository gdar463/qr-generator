import { z } from "zod";

export const historySchema = z.object({
  version: z.enum(["main", "fixed_array", "v0.1"]).default("main"),
  qrVersion: z.coerce.number().min(1).max(40).default(1),
  margin: z.coerce.number().min(0).default(0),
});
