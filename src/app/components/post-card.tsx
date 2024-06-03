/* eslint-disable @next/next/no-img-element */
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Post } from "src/models/post.model";

interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/post/${post.slug}`}
      key={post.id}
      className="space-y-4 border-gray/50 border-[1px] rounded-2xl p-4 hover:border-black/25 transition-colors"
    >
      <h1 className="text-gray-600 text-sm">
        {new Date(post.date).toLocaleDateString("pt-BR", {
          dateStyle: "long",
        })}
        &nbsp;-&nbsp;{post.author.name}
      </h1>
      <img
        src={post.cover.formats.small?.url || "/imagens/placeholder.png"}
        alt={post.cover.alternativeText}
        className="rounded-lg w-full h-64 object-cover"
      />
      <div className="flex justify-between gap-8 items-start">
        <h1 className="font-semibold text-lg">{post.title}</h1>
        <Button>Ler mais</Button>
      </div>
    </Link>
  );
}
