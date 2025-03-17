/* eslint-disable @next/next/no-img-element */
import PostCard from "@app/components/post-card";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import Icon from "@components/ui/icon";
import { Separator } from "@components/ui/separator";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getPost, getPostsSlugs, getRandomPosts } from "src/providers/post.provider";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const response = await getPostsSlugs();
  const slugs = response.map((slug) => ({ slug }));
  return slugs;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} - Faculdade Betânia de Curitiba`,
    description: "Blog - Faculdade Betânia de Curitiba",
    authors: [post.author],
  };
}

export default async function Page(props: Props) {
  const params = await props.params;

  const { slug } = params;

  const post = await getPost(slug);
  if (!post) notFound();

  const data = await getRandomPosts(slug);

  const imageUrl = post.cover.formats.large?.url ?? post.cover.formats.medium?.url ?? post.cover.url;

  const readingTime = Math.ceil(post.body.trim().split(/\s+/).length / 200);

  const avatar = post.author.photo?.formats?.small?.url ?? post.author.photo?.url ?? null;

  console.log(post.author);

  return (
    <main className="container max-w-screen-xl mx-auto p-4">
      <h1 className="text-6xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-400 flex items-center -mb-2 -mt-4">
        <Avatar name={post.author.name} photo={avatar} />
        &nbsp;-&nbsp;
        <h1 className="font-light text-sm">
          {new Date(post.date).toLocaleDateString("pt-BR", {
            dateStyle: "long",
          })}
          &nbsp;&#8226;&nbsp;{readingTime} min. de leitura
        </h1>
      </div>
      <div className="flex flex-col gap-6 items-start">
        {imageUrl && (
          <div className="w-full flex-shrink-0">
            <img
              src={imageUrl}
              alt={post.cover.alternativeText ?? "post"}
              className="object-cover rounded-lg w-full h-auto shadow-md"
            />
          </div>
        )}
        <div className="w-full">
          <Markdown className="text-justify prose min-w-full" rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {post.body}
          </Markdown>
          <div className="text-gray-400 flex flex-col text-sm">
            <Avatar name={post.author.name} photo={avatar} />
            <div>{post.author.description}</div>
          </div>
          <Separator className="my-8 bg-gray-300" />
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
            {data.map((post) => (
              <PostCard {...{ post }} key={post.id} />
            ))}
          </section>
          <Button variant="link" asChild className="gray-500 font-light">
            <Link href="/">
              <Icon name="MoveLeft" strokeWidth={1} />
              &nbsp;Voltar ao início
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
