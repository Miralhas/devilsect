import { env } from "@/env";
import { statusMap } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { BookOpenText, StarIcon } from "lucide-react";
import DynamicBlurImage from "../dynamic-blur-image";

const NovelCard = ({ author, ratingValue, status, title, slug }: NovelSummary) => {
  return (
    <div className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
        <DynamicBlurImage
          src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
          alt={`${title} cover`}
          className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90"
          fill
        />
        <div className="absolute inset-0 rounded-r-5 book-cover" />

        <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">

          <div className="flex flex-col justify-center items-center w-full">

            <div className="border border-accent bg-primary/40 p-4 rounded-full mb-4">
              <BookOpenText className="size-4" />
            </div>

            <div className="text-center mb-2">
              <p className="font-semibold px-2 text-white text-ellipsis whitespace-nowrap max-w-[115px] text-[12px] overflow-hidden capitalize">
                {title}
              </p>
              <p className="text-accent font-bold text-ellipsis whitespace-nowrap max-w-[115px] text-[12px] overflow-hidden capitalize">
                {author}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 bg-accent/80 border border-accent rounded-bl-lg font-bold text-white text-xs text-[10px] px-[.3125rem] py-[.2125rem] overflow-hidden">
          {statusMap[status]}
        </div>

        <div className="absolute bottom-0 left-0 lg:top-0 lg:bottom-auto bg-gray-950/60 rounded-bl text-white text-xs p-1 font-bold flex gap-1 items-center">
          <StarIcon className="size-2.5 text-[#D3AF37]" fill="#D3AF37" />
          <span className="text-xs text-[10px]">{ratingValue ?? '0.0'}</span>
        </div>
      </div>

      <p className="font-semibold text-ellipsis whitespace-nowrap max-w-[115px] text-[12px] md:text-[13px] overflow-hidden capitalize group-hover:opacity-50 transition-opacity duration-300">
        {title}
      </p>
    </div>
  )
}

export default NovelCard;
