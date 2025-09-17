import { statusMap } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import { StarIcon } from "lucide-react";

const InfoOverlay = ({ status, ratingValue }: Pick<NovelSummary, "status" | "ratingValue">) => {
  return (
    <>
      <div className="absolute top-0 right-0 bg-accent/80 border border-accent rounded-bl-lg font-bold text-white text-xs text-[10px] px-[.3125rem] py-[.2125rem] overflow-hidden">
        {statusMap[status]}
      </div>

      <div className="absolute bottom-0 left-0 lg:top-0 lg:bottom-auto bg-gray-950/60 rounded-bl text-white text-xs p-1 font-bold flex gap-1 items-center">
        <StarIcon className="size-2.5 text-[#D3AF37]" fill="#D3AF37" />
        <span className="text-xs text-[10px]">{ratingValue ?? 'N/A'}</span>
      </div>
    </>
  )
}

export default InfoOverlay;
