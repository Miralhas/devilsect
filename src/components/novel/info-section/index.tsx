import DynamicBlurImage from "@/components/dynamic-blur-image";
import NovelBadge from "@/components/novel/info-section/novel-badge";
import StartReadingButton from "@/components/novel/info-section/start-reading-button";
import StartReadingButtonLoading from "@/components/novel/info-section/start-reading-button-loading";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { statusMap } from "@/lib/utils";
import { Novel } from "@/types/novel";
import { BookOpenText, Eye, StarIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const InfoSection = async ({ novel }: { novel: Novel }) => {
  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);

  return (
    <section className="bg-zinc-950/70 px-5 md:px-10">
      <div className="mx-auto max-w-[1024px] md:grid md:grid-cols-[243px_1fr] space-y-4 gap-4 py-8 md:py-12 lg:py-16 xl:px-0 mb-0 relative auto-rows-[350px]">
        <div className="relative max-h-[300px] md:max-h-[350px] aspect-[2/3] w-full md:col-span-1 h-full">
          <DynamicBlurImage
            priority
            sizes="(max-width: 768px) 40vw, 15vw"
            quality={100}
            blurData={base64}
            alt={novel.title + " cover"}
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
            className="object-contain md:object-cover rounded-r-lg h-full"
          />
        </div>
        <div className="w-full col-span-1 flex flex-col gap-4">
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
              <h1 className="capitalize text-2xl md:text-3xl font-bold">{novel.title}</h1>
              <p className="text-muted-foreground font-normal text-sm md:text-[15px] ml-0.5">Author: <Link href="/" className="text-accent font-semibold">{novel.author}</Link></p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap w-full max-w-[570px]">
            {novel.genres.map(genre => (
              <NovelBadge name={genre} key={genre} />
            ))}
          </div>
          <div className="flex gap-1 items-center ml-1">
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
            <span className="font-semibold">{novel.metrics.ratingValue ?? '0.0'}</span>
            <p className="ml-1 text-sm text-muted-foreground">({novel.metrics.ratingSize} <span className="relative">ratings</span>)</p>
          </div>
          <div className="mt-5 md:mt-auto w-full">
            <Suspense fallback={<StartReadingButtonLoading />}>
              <StartReadingButton novel={novel} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection;
