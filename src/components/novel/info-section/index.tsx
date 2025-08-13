import Container from "@/components/container";
import DynamicBlurImage from "@/components/dynamic-blur-image";
import NovelBadge from "@/components/novel/info-section/novel-genre";
import StartReadingButton from "@/components/novel/info-section/start-reading-button";
import StartReadingButtonLoading from "@/components/novel/info-section/start-reading-button-loading";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { statusMap } from "@/lib/utils";
import { getNovelBySlug } from "@/services/novels/server-queries";
import { BookOpenText, Eye, StarIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const InfoSection = async ({ slug }: { slug: string }) => {
  const novel = await getNovelBySlug(slug);
  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);

  return (
    <section className="bg-zinc-950/70">
      <Container className="max-w-[1024px] md:grid md:grid-cols-[243px_1fr] gap-4 py-6 xl:px-0 mb-0 relative">
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
        <div className="w-full col-span-1 flex flex-col gap-8 lg:gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Badge variant="cool">{statusMap[novel.status]}</Badge>
              <div className="flex items-center gap-1 ">
                <BookOpenText className="size-4 mt-0.5 hidden xs:block" />
                <p className="text-muted-foreground text-sm whitespace-nowrap">{novel.chaptersCount} Chapters</p>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="size-5 relative top-0.25 hidden xs:block" />
                <p className="text-muted-foreground text-sm whitespace-nowrap">{novel.metrics.views} Views</p>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="capitalize text-3xl font-bold">{novel.title}</h1>
              <p className="text-muted-foreground font-normal text-[15px] ml-1">Author: <Link href="/" className="text-accent font-semibold">{novel.author}</Link></p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap w-full max-w-[570px]">
            {novel.genres.map(genre => (
              <NovelBadge name={genre} key={genre} />
            ))}
          </div>
          <div className="flex gap-1 items-center ml-1 ">
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <span className="font-semibold">{novel.metrics.ratingValue ?? '0.0'}</span>
            <p className="ml-1 text-sm text-muted-foreground">({novel.metrics.ratingSize} <span className="relative">ratings</span>)</p>
          </div>
          <div className="mt-auto w-full">
            <Suspense fallback={<StartReadingButtonLoading />}>
              <StartReadingButton novel={novel} />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default InfoSection;
