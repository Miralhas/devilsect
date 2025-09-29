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
import { EldersChoice } from "@/types/novel";
import Link from "next/link";

const ChoicesCarousel = ({ choices }: { choices: EldersChoice[] }) => {
  return (
    <Carousel className="grid gap-3" opts={{ slidesToScroll: 3, align: "start" }}>
      <CarouselContent className="mr-0.5">
        {choices.map(async (choice) => {
          const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${choice.novel.slug}/image`);
          return (
            <CarouselItem className="basis-1/3 md:basis-1/6" key={choice.id}>
              <Link
                className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block"
                href={`/novels/${choice.novel.slug}`}>
                <NovelCard
                  novelSummary={choice.novel}
                  size="lg"
                  titleClassName="md:text-[15px]"
                  imageSizes="(max-width: 768px) 30vw, 10vw"
                  blurData64={base64}
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

export default ChoicesCarousel;
