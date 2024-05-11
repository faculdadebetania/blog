/* eslint-disable @next/next/no-img-element */
import { Button } from "@components/ui/button";
import Icon from "@components/ui/icon";
import Image from "next/image";
import Link from "next/link";
import usePagination from "src/hooks/pagination.hook";
import { Post } from "src/models/post.model";

interface Props {
  searchParams: {
    page: string;
  };
}
export default async function Home({ searchParams: { page = "1" } }: Props) {
  const searchParams = new URLSearchParams({
    "pagination[start]": ((+page - 1) * 10).toString(),
    "pagination[limit]": "10",
    sort: "date:desc",
    populate: "*",
  });

  const url = `https://cms.faculdadebetania.com.br/api/blogs?${searchParams.toString()}`;

  console.log("[##] URL", url);

  const response = await fetch(url).then((res) => res.json());
  const [lastPost, ...posts] = response.data as Array<Post>;
  const count = response.meta.pagination.total;

  const { Pagination } = usePagination({ count, page: +page });

  console.log("[##] LAST POST", JSON.stringify(lastPost, null, 2));

  return (
    <main className="container space-y-16">
      <Link
        href={`/post/${lastPost.slug}`}
        className="flex gap-8 h-96 border-gray/50 border-[1px] rounded-2xl p-8 hover:border-black/25 transition-colors"
      >
        <div className="relative min-w-96 flex justify-start md:w-1/2 lg:w-1/3">
          <Image
            src={lastPost.cover.formats.small.url}
            alt={lastPost.cover.alternativeText}
            className="object-cover rounded-lg"
            fill
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <h1 className="text-3xl font-bold">{lastPost.title}</h1>
          <div className="overflow-hidden relative">
            <div className="text-justify">{lastPost.body}</div>
            <div className="absolute w-full h-full top-0 left-0 shadow-[inset_0px_-64px_32px_-16px_#FAFAFA]" />
          </div>
          <div className="flex justify-between">
            <h2 className="text-gray-400 font-light">
              {new Date(lastPost.date).toLocaleDateString("pt-BR", {
                dateStyle: "long",
              })}{" "}
              - {lastPost.author.name}
            </h2>
            <Button>Ler mais</Button>
          </div>
        </div>
      </Link>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            href={`/post/${post.slug}`}
            key={post.id}
            className="space-y-4 border-gray/50 border-[1px] rounded-2xl p-4 hover:border-black/25 transition-colors"
          >
            <h1 className="text-gray-600 text-sm">
              {new Date(post.date).toLocaleDateString("pt-BR", {
                dateStyle: "long",
              })}{" "}
              - {post.author.name}
            </h1>
            <img
              src={post.cover.formats.small.url}
              alt={post.cover.alternativeText}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="flex justify-between gap-8 items-start">
              <h1 className="font-semibold text-lg">{post.title}</h1>
              <Button>Ler mais</Button>
            </div>
          </Link>
        ))}
      </section>
      <Pagination />
    </main>
  );
}
