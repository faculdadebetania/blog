import { z } from "zod";

export const CMS_SCHEMA = z.object({
  data: z.any(),
  meta: z.any(),
  error: z
    .object({
      status: z.number(),
      name: z.string(),
      message: z.string(),
      details: z.any(),
    })
    .optional(),
});
