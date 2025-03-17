/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@components/ui/avatar";
import Link from "next/link";
import { Post } from "src/models/post.model";

interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  const readingTime = Math.ceil(post.body.trim().split(/\s+/).length / 200);
  const avatar = post.author.photo?.formats?.small?.url ?? post.author.photo?.url ?? null;
  return (
    <Link
      href={`/post/${post.slug}`}
      key={post.id}
      className="group space-y-2 rounded-2xl hover:border-black/25 transition-colors"
    >
      <img
        src={post.cover.formats.small?.url || "/imagens/placeholder.png"}
        alt={post.cover.alternativeText ?? "placeholder"}
        className="rounded-lg w-full h-64 object-cover group-hover:opacity-50 transition-opacity duration-300"
      />
      <h1 className="text-gray-400 text-sm">
        {new Date(post.date).toLocaleDateString("pt-BR", {
          dateStyle: "long",
        })}
        &nbsp;&#8226;&nbsp;{readingTime} min. de leitura
      </h1>
      <h1 className="font-semibold text-lg group-hover:underline transition-all duration-300">{post.title}</h1>
      <p className="text-ellipsis w-full line-clamp-2 text-gray-500 text-sm">{post.body}</p>
      <Avatar name={post.author.name} photo={avatar} />
    </Link>
  );
}
