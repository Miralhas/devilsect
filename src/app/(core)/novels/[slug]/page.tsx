import Container from "@/components/container";
import DynamicBlurImage from "@/components/dynamic-blur-image";
import StartReadingButton from "@/components/novel/start-reading-button";
import StartReadingButtonLoading from "@/components/novel/start-reading-button-loading";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { statusMap } from "@/lib/utils";
import { putView } from "@/services/novels/api";
import { getNovelBySlug } from "@/services/novels/server-queries";
import { Eye, StarIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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
        <Container className="max-w-[1024px] md:grid md:grid-cols-[243px_500px] gap-4 py-6 lg:px-0 mb-0 relative">
          <div className="relative max-h-[300px] md:max-h-max aspect-[2/3] w-full md:col-span-1">
            <DynamicBlurImage
              src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
              alt={novel.title + " cover"}
              blurData={base64}
              quality={100}
              sizes="33vh"
              className="object-contain md:object-cover  rounded-r-lg"
            />
          </div>
          <div className="w-full col-span-1 flex flex-col gap-4">
            <div className="space-y-0.5">
              <Badge variant="cool">{statusMap[novel.status]}</Badge>
              <h1 className="capitalize text-3xl font-bold">{novel.title}</h1>
            </div>
            <div className="flex gap-1 items-center">
              <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
              <span className="font-semibold">{novel.metrics.ratingValue ?? '0.0'}</span>
              <p className="ml-1 text-sm text-muted-foreground">{novel.metrics.ratingSize} <span className="relative">Avaliations</span></p>
              <Eye className="size-5 ml-2 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">{novel.metrics.views}</p>
            </div>
            <p className="text-muted-foreground font-normal">Author: <Link href="/" className="text-accent font-semibold">{novel.author}</Link></p>
            <div className="mt-auto w-full">
              <Suspense fallback={<StartReadingButtonLoading />}>
                <StartReadingButton novel={novel} />
              </Suspense>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default NovelPage;
