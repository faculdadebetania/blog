/* eslint-disable @next/next/no-img-element */
import PostCard from "@app/components/post-card";
import { Button } from "@components/ui/button";
import Icon from "@components/ui/icon";
import { Separator } from "@components/ui/separator";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Post } from "src/models/post.model";
import { getPost, getPosts } from "src/providers/post.provider";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { count } = await getPosts({ page: 0, pageSize: 0 });
  const posts = await getPosts({ page: 1, pageSize: count });
  return posts.data.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} - Faculdade Betânia de Curitiba`,
    description: "Blog - Faculdade Betânia de Curitiba",
    authors: [post.author],
  };
}

export default async function Page({ params: { slug } }: Props) {
  const post = await getPost(slug);
  if (!post) notFound();

  const { data } = await getPosts({
    page: 1,
    pageSize: 3,
    filter: { field: "slug", operator: "$ne", value: slug },
  });

  const imageURL = post.cover?.formats?.small?.url;

  return (
    <main className="container">
      {imageURL && (
        <img
          src={post.cover.formats.small.url}
          alt={post.cover.alternativeText}
          className="object-cover rounded-lg w-full h-full md:w-1/2 lg:w-1/3 md:float-left md:mr-4 md:mb-4"
        />
      )}
      <p className="text-gray-600 text-sm mt-4 md:mt-0">
        {new Date(post.date).toLocaleDateString("pt-BR", {
          dateStyle: "long",
        })}
        &nbsp;-&nbsp;{post.author.name}
      </p>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <Markdown className="text-justify">{post.body}</Markdown>
      <Separator className="my-8 bg-gray-300" />
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
        {data.map((post) => (
          <PostCard {...{ post }} key={post.id} />
        ))}
      </section>
      <Button variant="link" asChild className="gray-500 font-light text-lg">
        <Link href="/">
          <Icon name="MoveLeft" />
          &nbsp;Voltar ao início
        </Link>
      </Button>
    </main>
  );
}
