import NovelCard from "@/components/novel-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { NovelSummary } from "@/types/novel";
import Link from "next/link";

const NovelsCarousel = ({ novels }: { novels: NovelSummary[] }) => {
  return (
    <Carousel className="grid gap-3" opts={{ slidesToScroll: 2, align: "start" }}>
      <CarouselContent className="mr-0.5">
        {novels.map(async (novel, index) => {
          const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);
          return (
            <CarouselItem className="basis-1/3 md:basis-1/6" key={novel.id}>
              <Link
                className="group space-y-2"
                href={`/novels/${novel.slug}`}>
                <NovelCard
                  novelSummary={novel}
                  size="lg"
                  titleClassName="md:text-[15px]"
                  imageSizes="(max-width: 768px) 20vw, 10vw"
                  blurData64={base64}
                  loading={index <= 2 ? "eager" : "lazy"}
                />
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <div className="w-full gap-6 flex justify-center">
        <CarouselPrevious className="rounded-md size-7" variant="cool-secondary" />
        <CarouselDots className="w-auto" />
        <CarouselNext className="rounded-md size-7" variant="cool-secondary" />
      </div>
    </Carousel>
  )
}

export default NovelsCarousel;
