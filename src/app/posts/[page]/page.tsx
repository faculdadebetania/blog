/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import usePagination from "src/hooks/pagination.hook";
import { getPosts, getPostsCount } from "src/providers/post.provider";
import PostCard from "../../components/post-card";
import Hero from "./components/hero";

interface Props {
  params: Promise<{
    page: string;
  }>;
}

export async function generateStaticParams() {
  const count = await getPostsCount();
  const pages = Math.ceil(count / 10);
  const params = Array.from(Array(pages).keys()).map((page) => ({
    page: (page + 1).toString(),
  }));
  return params;
}

export default async function Home(props: Props) {
  const params = await props.params;

  const { page = "1" } = params;

  const [lastPost, ...posts] = await getPosts({ page: +page });

  const count = await getPostsCount();

  const { Pagination } = usePagination({ count, page: +page });

  return (
    <main className="container space-y-16 !pt-4">
      <Hero post={lastPost} />
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard {...{ post }} key={post.id} />
        ))}
      </section>
      <Pagination />
    </main>
  );
}
