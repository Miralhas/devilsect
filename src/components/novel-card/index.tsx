import { statusMap } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { BookOpenText, StarIcon } from "lucide-react";

const NovelCard = ({ author, ratingValue, status, title }: NovelSummary) => {
  return (
    <div className="group space-y-2">
      <div className="overflow-hidden relative transform-all duration-300 ease-initial group-hover:-translate-y-2 rounded-r-md shadow-sm group-hover:shadow-md shadow-accent">
        <img src="/cover.jpg" alt="" className="inline-block object-contain w-full group-hover:scale-105 transition-all duration-500 ease-in-out opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full rounded-r-5 book-cover"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="border border-accent bg-primary/40 p-4 rounded-full">
            <BookOpenText className="size-6" />
          </div>
          <div className="absolute bottom-0 md:mb-4 left-0 right-0 p-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-center">
            <p className="font-semibold text-white mb-0.5 line-clamp-1 text-sm md:text-base capitalize">{title}</p>
            <p className="text-xs md:text-sm text-accent font-bold capitalize line-clamp-1">{author}</p>
          </div>
        </div>
        <div className="left-0 bg-gray-950/50 absolute top-0 rounded-[0_0_4px_0] text-white text-xs p-1 font-bold">{statusMap[status]}</div>
        <div className="right-0 bg-gray-950/60 absolute top-0 rounded-[0_0_4px_0] text-white text-xs p-1 font-bold flex gap-1 items-center">
          <StarIcon className="size-3 text-[#D3AF37]" fill="#D3AF37" />
          <p className="text-white text-xs">{ratingValue ?? '0.0'}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm md:text-[15.2px] font-semibold leading-[120%] font-inter tracking-[-0.04em] capitalize">
        {title}
      </p>
    </div>
  )
}

export default NovelCard;
