import NovelCard from "@/components/novel-card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EldersChoice } from "@/types/novel";
import Link from "next/link";

const ChoicesCarousel = ({ choices }: { choices: EldersChoice[] }) => {
  return (
    <Carousel className="grid gap-3" opts={{ slidesToScroll: 3, align: "start" }}>
      <CarouselContent className="mr-0.5">
        {choices.map(choice => (
          <CarouselItem className="basis-1/3 md:basis-1/6" key={choice.id}>
            <Link
              className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block"
              href={`/novels/${choice.novel.slug}`}>
              <NovelCard novelSummary={choice.novel} size="lg" imageSizes="(max-width: 768px) 33vw, 15vw" />
            </Link>
          </CarouselItem>
        ))}
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
