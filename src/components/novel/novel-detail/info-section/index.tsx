import DynamicBlurImage from "@/components/dynamic-blur-image";
import NovelBadge from "@/components/novel/novel-detail/info-section/novel-badge";
import { Badge } from "@/components/ui/badge";
import wsrvLoader from "@/components/wsrvLoader";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { Novel } from "@/types/novel";
import { statusMap } from "@/utils/api-utils";
import { formatViews } from "@/utils/number-utils";
import { BookOpenText, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NovelRating from "./rating";
import StartReadingButton from "./start-reading-button";

const InfoSection = async ({ novel }: { novel: Novel }) => {
  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);

  return (
    <section className="bg-zinc-950/70 px-5 md:px-10 relative">
      <div className="mx-auto max-w-[1024px] md:grid md:grid-cols-[243px_1fr] space-y-4 gap-4 py-8 md:py-12 lg:py-16 xl:px-0 mb-0 relative auto-rows-[350px]">
        <div className="relative max-h-[300px] md:max-h-[350px] aspect-[2/3] w-full md:col-span-1 h-full">
          <DynamicBlurImage
            priority
            sizes="(max-width: 768px) 40vw, 15vw"
            blurData={base64}
            alt={novel.title + " cover"}
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
            className="object-contain md:object-cover z-[1] rounded-r-lg h-full shadow-2xl text-transparent"
            default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
          />
          <div className="absolute inset-0 md:hidden w-full h-full">
            <Image
              fill
              quality={1}
              src={base64}
              alt="glass effect background"
              sizes="(max-width: 768px) 90vw, 0vw"
              className="object-center object-cover opacity-30 text-transparent"
              loader={wsrvLoader}
            />
          </div>
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
                <p className="text-muted-foreground text-sm whitespace-nowrap">{formatViews(novel.metrics.views)} Views</p>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="capitalize text-2xl md:text-3xl font-bold">{novel.title}</h1>
              <p className="text-muted-foreground font-normal text-sm md:text-[15px] ml-0.5">Author: <Link href={`/authors/${novel.author.toLowerCase()}`} className="text-accent font-semibold">{novel.author}</Link></p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap w-full max-w-[570px]">
            {novel.genres.map(genre => (
              <NovelBadge name={genre} href={`/genres/${genre.toLowerCase()}`} key={genre} />
            ))}
          </div>
          <NovelRating novel={novel} />
          <div className="mt-5 md:mt-auto w-full">
            <StartReadingButton novel={novel} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection;
