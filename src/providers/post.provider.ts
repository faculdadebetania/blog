import { notFound } from "next/navigation";
import { Post, Posts } from "src/models/post.model";
import { PostCountSchema } from "src/schemas/posts/post.count.schema";
import { PostListSchema } from "src/schemas/posts/post.list.schema";
import { PostRandomSchema } from "src/schemas/posts/post.random.schema";
import { PostSchema } from "src/schemas/posts/post.schema";
import { PostSlugsSchema } from "src/schemas/posts/post.slugs.schema";
import { fetchCMS } from "./cms.provider";

interface Props {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: {
    field: keyof Post;
    operator: string;
    value: string;
  };
}
export async function getPosts(props?: Props): Promise<Posts> {
  const page = props?.page ?? 1;
  const pageSize = props?.pageSize ?? 10;
  const sort = props?.sort ?? "date:desc";
  const filter = props?.filter;

  const params: Record<string, string> = {
    "pagination[start]": ((+page - 1) * 10).toString(),
    "pagination[limit]": pageSize.toString(),
    "populate[cover]": "*",
    "populate[author][fields][0]": "name",
    "populate[author][populate][photo]": "*",
    sort: sort,
  };

  if (filter) params[`filters[${filter.field}][${filter.operator}]`] = filter.value;

  const response = await fetchCMS({
    uri: "blogs",
    method: "GET",
    schema: PostListSchema,
    params,
  });

  if (response.length < 1) notFound();

  return response;
}

export async function getPost(slug: string): Promise<Post> {
  const response = await fetchCMS({
    uri: "blog/post",
    method: "GET",
    schema: PostSchema,
    params: { slug },
    tag: slug,
  });

  return response;
}

export async function getRandomPosts(slug: string): Promise<Posts> {
  const response = await fetchCMS({
    uri: "blog/random",
    method: "GET",
    schema: PostRandomSchema,
    params: { slug },
  });

  return response;
}

export async function getPostsCount(): Promise<number> {
  const { count } = await fetchCMS({
    uri: "blog/count",
    method: "GET",
    schema: PostCountSchema,
    tag: "list",
  });

  return count;
}

export async function getPostsSlugs(): Promise<Array<string>> {
  const { slugs } = await fetchCMS({
    uri: "blog/slugs",
    method: "GET",
    schema: PostSlugsSchema,
  });

  return slugs;
}
