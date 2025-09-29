import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import wsrvLoader from "@/components/wsrvLoader";
import { statusMap } from "@/utils/api-utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BANNERS } from "./banners-data";


const CarouselNovel = async () => {

  return (
    <Carousel
      className="w-full lg:w-[62%] grid"
      opts={{
        loop: false,
      }}
      // plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent className="h-64 will-change-auto">
        {BANNERS.map((banner, index) => (
          <CarouselItem key={index}>
            <Link href={`/novels/${banner.slug}`}>
              <div className="h-full relative rounded-lg overflow-hidden bg-black">
                <div className="absolute z-[1] top-0 h-full w-full overflow-hidden rounded-12 aspect-[3/1]">
                  <Image
                    fill
                    sizes="(max-width: 768px) 90vw, 25vw"
                    src={banner.src}
                    alt="novel banner"
                    className="w-full object-cover opacity-40"
                    quality={10}
                    priority={index === 0} // first image = priority
                    loading={index === 0 ? "eager" : "lazy"}
                    loader={wsrvLoader}
                  />
                </div>

                <div className="absolute z-[2] right-0 md:right-13 top-0 overflow-hidden aspect-[3/4] w-full max-w-[200px]">
                  <Image
                    fill
                    alt="novel main character"
                    src={banner.mc}
                    quality={50}
                    priority={index === 0} // first image = priority
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 30vw, 10vw"
                    loader={wsrvLoader}
                  />
                </div>

                <div className="absolute bottom-0 z-[3] h-full md:h-24 w-full">
                  <div className="h-full bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <div className="absolute bottom-0 z-[4] flex p-8 xs:p-10 w-full md:h-full flex-col md:max-w-lg gap-2 md:justify-around">
                  <p className="text-white text-lg md:text-[28px] font-bold leading-[115%] tracking-[-0.02em]">{banner.name}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                      <StarIcon className="size-4 md:size-5 text-[#D3AF37]" fill="#D3AF37" />
                      <p className="text-white text-sm md:text-[16px] font-semibold leading-[120%] tracking-[-0.02em]">4.73</p>
                    </div>
                    <p className="text-white text-sm md:text-[20px] font-semibold leading-[120%] tracking-[-0.02em]">
                      {statusMap[banner.status]}
                    </p>
                  </div>
                  <p className="text-sm md:text-[16px] font-normal leading-[120%] tracking-[-0.02em] line-clamp-3">
                    {banner.description}
                  </p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full mt-3 lg:mt-auto gap-6 flex justify-center">
        <CarouselPrevious className="rounded-md size-7" variant="cool-secondary" />
        <CarouselDots className="w-auto" />
        <CarouselNext className="rounded-md size-7" variant="cool-secondary" />
      </div>
    </Carousel>
  )
}

export default CarouselNovel;
