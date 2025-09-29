import { env } from "@/env";
import { NovelSummary } from "@/types/novel";
import { cn } from "@/utils/common-utils";
import DynamicBlurImage from "../dynamic-blur-image";
import BookCoverOverlay from "./book-cover-overlay";
import HoverOverlay from "./hover-overlay";
import InfoOverlay from "./info-overlay";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type Size = "sm" | "lg";

type NovelCardProps = {
  novelSummary: NovelSummary;
  size?: Size;
  imageSizes?: string;
  titleClassName?: string;
  blurData64?: string;
}

const NovelCard = ({ novelSummary, imageSizes, titleClassName, blurData64, size = "sm" }: NovelCardProps) => {
  const { author, ratingValue, status, title, slug } = novelSummary;
  return (
    <>
      <div className="relative aspect-[2/3] overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
        <DynamicBlurImage
          src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
          alt={`${title} cover`}
          className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90"
          blurData={blurData64}
          sizes={imageSizes ?? "20vw"}
          fill
          default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
        />
        <BookCoverOverlay />
        <HoverOverlay info={{ author, title }} size={size} />
        <InfoOverlay ratingValue={ratingValue} status={status} />
      </div>

      <Tooltip delayDuration={300}>
        <TooltipTrigger className="text-start cursor-pointer">
          <h3
            className={cn("tracking-tight font-semibold leading-tight text-foreground/90 capitalize line-clamp-2 break-words hyphens-auto group-hover:text-foreground/60 transition-colors duration-300 text-xs md:text-sm", titleClassName)}
          >
            {title}
          </h3>
        </TooltipTrigger>
        <TooltipContent className="capitalize text-center bg-secondary border border-zinc-50/10 text-zinc-200">
          {title}
        </TooltipContent>
      </Tooltip>
    </>
  )
}

export default NovelCard;
