/* eslint-disable @next/next/no-img-element */
import { Button } from "@components/ui/button";
import Link from "next/link";
import usePagination from "src/hooks/pagination.hook";
import { Post } from "src/models/post.model";
import Markdown from "react-markdown";
import PostCard from "../../components/post-card";
import { getPosts } from "src/providers/post.provider";

interface Props {
  params: {
    page: string;
  };
}

export async function generateStaticParams() {
  const { count } = await getPosts({ page: 0, pageSize: 0 });
  const pages = Math.ceil(count / 10);
  const params = Array.from(Array(pages).keys()).map((page) => ({
    page: (page + 1).toString(),
  }));
  return params;
}

export default async function Home({ params: { page = "1" } }: Props) {
  const {
    count,
    data: [lastPost, ...posts],
  } = await getPosts({ page: +page });

  const { Pagination } = usePagination({ count, page: +page });

  return (
    <main className="container space-y-16">
      <Link
        href={`/posts/${lastPost.slug}`}
        className="flex flex-col gap-8 h-[768px] border-gray/50 border-[1px] rounded-2xl p-8 hover:border-black/25 transition-colors md:flex-row md:h-96"
      >
        <img
          src={lastPost.cover.formats.small.url}
          alt={lastPost.cover.alternativeText}
          className="object-cover rounded-lg w-full h-full md:w-1/2 lg:w-1/3"
        />

        <div className="space-y-2 grid grid-rows-[1fr_auto_1fr] overflow-hidden">
          <h1 className="text-3xl font-bold">{lastPost.title}</h1>

          <div className="overflow-hidden relative">
            <Markdown className="text-justify">{lastPost.body}</Markdown>
            <div className="absolute w-full h-full top-0 left-0 shadow-[inset_0px_-64px_32px_-16px_#FAFAFA]" />
          </div>

          <div className="flex justify-between">
            <h2 className="text-gray-400 font-light">
              {new Date(lastPost.date).toLocaleDateString("pt-BR", {
                dateStyle: "long",
              })}
              &nbsp;-&nbsp;{lastPost.author.name}
            </h2>
            <Button>Ler mais</Button>
          </div>
        </div>
      </Link>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard {...{ post }} key={post.id} />
        ))}
      </section>
      <Pagination />
    </main>
  );
}
