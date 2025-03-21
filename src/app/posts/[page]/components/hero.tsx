/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import Link from "next/link";
import Markdown from "react-markdown";
import { Post } from "src/models/post.model";

interface Props {
  post: Post;
}
export default function Hero({ post }: Props) {
  const imageUrl = post.cover.formats.large?.url ?? post.cover.url;
  const readingTime = Math.ceil(post.body.trim().split(/\s+/).length / 200);
  const avatar = post.author.photo?.formats?.small?.url ?? post.author.photo?.url ?? null;

  return (
    <Link
      href={`/post/${post.slug}`}
      className="group flex flex-col gap-8 h-[768px] hover:border-black/25 transition-colors md:flex-row md:h-96"
    >
      <img
        src={imageUrl}
        alt={post.cover.alternativeText ?? "post"}
        className="object-cover rounded-lg w-full h-auto md:w-1/2 lg:w-1/3 group-hover:opacity-90 transition-all duration-300"
      />

      <div className="space-y-2 grid grid-rows-[1fr_1fr_auto_1fr] overflow-hidden w-full">
        <h2 className="text-gray-400 font-light">
          {new Date(post.date).toLocaleDateString("pt-BR", {
            dateStyle: "long",
          })}
          &nbsp;&#8226;&nbsp;{readingTime} min. de leitura
        </h2>
        <h1 className="text-3xl font-bold group-hover:underline transition-all duration-300">{post.title}</h1>

        <div className="overflow-hidden relative">
          <Markdown className="text-justify">{post.body}</Markdown>
          <div className="absolute w-full h-full top-0 left-0 shadow-[inset_0px_-64px_32px_-16px_#FAFAFA]" />
        </div>

        <div className="flex justify-between">
          <Avatar name={post.author.name} photo={avatar} />
          <Button>Ler mais</Button>
        </div>
      </div>
    </Link>
  );
}
