import { z } from "zod";
import { PostSchema } from "./post.schema";

const schema = z.array(PostSchema);

export const PostListSchema = schema;
