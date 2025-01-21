import { z } from "zod";

export const qrSchema = z.object({
  content: z.string(),
  version: z.number().min(1).max(40).optional(),
  error: z.enum(["L", "M", "Q", "H"]).default("L"),
});
