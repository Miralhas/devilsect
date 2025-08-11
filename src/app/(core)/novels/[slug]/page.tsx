import { getNovelBySlug } from "@/services/novels/server-queries";
import Container from "@/components/container";
import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { Eye, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { putView } from "@/services/novels/api";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

const NovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);
  
  putView(slug);
  
  return (
    <section className="min-h-screen">
      <div className="bg-zinc-950/70">
        <Container className="md:grid md:grid-cols-[243px_1fr] gap-4 p-0 mb-0 pb-0">
          <DynamicBlurImage
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
            alt={novel.title + " cover"}
            blurData={base64}
            width={243}
            height={324}
            fill={false}
            quality={100}
            className="object-cover col-span-1 rounded-r-lg"
          />
          <div className="w-full col-span-1 flex flex-col gap-4">
            <h1 className="capitalize text-3xl font-bold">{novel.title}</h1>
            <div className="flex gap-1 items-center">
              <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
              <span className="font-semibold">{novel.metrics.ratingValue ?? '0.0'}</span>
              <p className="ml-1 text-sm text-muted-foreground">{novel.metrics.ratingSize} <span className="relative">Avaliations</span></p>
              <Eye className="size-5 ml-2 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">{novel.metrics.views}</p>
            </div>
            <p className="text-muted-foreground">Author: <span className="text-accent">{novel.author}</span></p>
            <div className="mt-auto pb-4">
              <Button variant="cool" asChild className="text-lg py-6 px-10 text-white font-bold uppercase tracking-tighter">
                <Link href={`/novels/${novel.slug}/${novel.firstChapter.slug}`}>Start Reading</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default NovelPage;
