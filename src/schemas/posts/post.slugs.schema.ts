import { z } from "zod";

const schema = z.object({ slugs: z.array(z.string()) });

export const PostSlugsSchema = schema;
