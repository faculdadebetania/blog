import { z } from "zod";

const schema = z.object({ count: z.number() });

export const PostCountSchema = schema;
