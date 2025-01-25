import { z } from "zod";

export const historySchema = z.object({
  content: z.string().nonempty(),
  version: z.enum(["main", "fixed_array", "v0.1"]).default("main"),
  qrVersion: z.coerce
    .number({ message: "Only numbers allowed" })
    .min(1, "Version must be ranged between 1-40 (inclusive)")
    .max(40, "Version must be ranged between 1-40 (inclusive)")
    .default(1),
  margin: z.coerce
    .number({ message: "Only number allowed" })
    .min(0, "Margin can't be lower than 0")
    .default(0),
});
