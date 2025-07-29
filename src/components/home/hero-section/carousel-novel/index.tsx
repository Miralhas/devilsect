'use client'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { statusMap } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { StarIcon } from "lucide-react";
import { BANNERS } from "./banners-data";


const CarouselNovel = () => {
  return (
    <Carousel
      className="w-full lg:w-[62%] grid"
      opts={{
        loop: false,
      }}
      plugins={[Autoplay({ delay: 6000 })]}
    >
      <CarouselContent className="h-64">
        {BANNERS.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="h-full relative rounded-lg overflow-hidden bg-black">
              <div className="absolute z-[1] top-0 h-full w-full overflow-hidden rounded-12">
                <img src={banner.src} alt="novel banner" className="w-full object-cover h-[95%] object-center opacity-40" />
              </div>

              <div className="absolute w-full max-w-[200px] z-[2] right-0 md:right-8 top-1 overflow-hidden">
                <img src={banner.mc} alt="novel main character" className="w-full h-full max-h-[280px] object-contain" />
              </div>

              <div className="absolute bottom-0 z-[3] h-full md:h-24 w-full ">
                <div className="h-full bg-gradient-to-t from-black to-transparent"></div>
              </div>

              <div className="absolute top-0 z-[4] flex p-10 w-full h-full flex-col md:max-w-lg gap-2 justify-around">
                <p className="text-white text-[28px] font-bold leading-[115%] tracking-[-0.02em]">{banner.name}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <StarIcon className="size-5 text-[#D3AF37]" fill="#D3AF37" />
                    <p className="text-white text-[16px] font-semibold leading-[120%] tracking-[-0.02em]">4.73</p>
                  </div>
                  <p className="text-white text-[20px] font-semibold leading-[120%] tracking-[-0.02em]">{statusMap[banner.status]}</p>
                </div>
                <p className="text-[16px] font-normal leading-[120%] tracking-[-0.02em] line-clamp-3">{banner.description}</p>
              </div>
            </div>
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
