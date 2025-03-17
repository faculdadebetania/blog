import { z } from "zod";

const schema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  date: z.string(),
  slug: z.string(),
  author: z.object({
    name: z.string(),
    description: z.string().nullable().optional(),
    photo: z
      .object({
        url: z.string(),
        formats: z.object({
          small: z.object({ url: z.string() }).optional(),
        }),
      })
      .nullable()
      .optional(),
  }),
  cover: z.object({
    url: z.string(),
    alternativeText: z.string().optional().nullable(),
    formats: z.object({
      large: z.object({ url: z.string() }).optional(),
      small: z.object({ url: z.string() }).optional(),
      medium: z.object({ url: z.string() }).optional(),
      thumbnail: z.object({ url: z.string() }).optional(),
    }),
  }),
});

export const PostSchema = schema;
