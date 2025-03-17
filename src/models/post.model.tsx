import { PostSchema } from "src/schemas/posts/post.schema";
import { z } from "zod";

export type Post = z.infer<typeof PostSchema>;
export type Posts = Array<Post>;
