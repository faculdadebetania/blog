import { Post } from "src/models/post.model";

export async function getPost(slug: string): Promise<Post | undefined> {
  const searchParams = new URLSearchParams({
    populate: "*",
    "filters[slug][$eq]": slug,
  });

  const url = `https://cms.faculdadebetania.com.br/api/blogs?${searchParams.toString()}`;

  const response = await fetch(url, { cache: "no-store" }).then((res) =>
    res.json()
  );
  const data = response.data as Array<Post> | undefined;
  return Array.isArray(data) ? data[0] : undefined;
}

interface Params {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: {
    field: keyof Post;
    operator: string;
    value: string;
  };
}
export async function getPosts(
  params?: Params
): Promise<{ count: number; data: Array<Post> }> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 10;
  const sort = params?.sort ?? "date:desc";
  const filter = params?.filter;

  const searchParams = new URLSearchParams({
    "pagination[start]": ((+page - 1) * 10).toString(),
    "pagination[limit]": pageSize.toString(),
    sort: sort,
    populate: "*",
  });

  if (filter)
    searchParams.append(
      `filters[${filter.field}][${filter.operator}]`,
      filter.value
    );

  const url = `https://cms.faculdadebetania.com.br/api/blogs?${searchParams.toString()}`;
  const response = await fetch(url, { cache: "no-store" }).then((res) =>
    res.json()
  );
  const data = response.data as Array<Post>;
  const count = response.meta.pagination.total;
  return { count, data };
}
