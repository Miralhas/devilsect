import { NovelSummary } from "@/types/novel";
import { BookOpenText } from "lucide-react";
import type { Size } from "./index";
import { cn } from "@/lib/utils";

type HoverOverlayProps = {
  info: Pick<NovelSummary, "author" | "title">;
  size?: Size;
}

const HoverOverlay = ({ info: { title, author }, size = "sm" }: HoverOverlayProps) => {
  const isLarge = size === "lg";
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">

      <div className="flex flex-col justify-around items-center w-full h-[70%]">

        <div className="border border-accent bg-primary/40 p-4 rounded-full">
          <BookOpenText className={cn("size-4", { "size-6": isLarge})} />
        </div>

        <div className={cn("text-sm text-center w-full px-2.5 text-[12px]", { "px-4 text-sm": isLarge })}>
          <p className="font-semibold text-white text-ellipsis whitespace-nowrap w-full overflow-hidden capitalize">
            {title}
          </p>
          <p className={cn("text-accent font-bold text-ellipsis whitespace-nowrap w-full overflow-hidden capitalize", {"pb-8": isLarge})}>
            {author}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HoverOverlay;
