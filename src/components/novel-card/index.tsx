import { env } from "@/env";
import { NovelSummary } from "@/types/novel";
import DynamicBlurImage from "../dynamic-blur-image";
import BookCoverOverlay from "./book-cover-overlay";
import HoverOverlay from "./hover-overlay";
import InfoOverlay from "./info-overlay";
import { cn } from "@/lib/utils";
import { getBlurData } from "@/lib/get-blur-data";

export type Size = "sm" | "lg";

type NovelCardProps = {
  novelSummary: NovelSummary;
  size?: Size;
  imageSizes?: string;
}

const NovelCard = async ({ novelSummary: { author, ratingValue, status, title, slug }, imageSizes, size = "sm" }: NovelCardProps) => {
  const isLarge = size === "lg";
  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`);
  return (
    <>
      <div className="relative aspect-[2/3] overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
        <DynamicBlurImage
          src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
          alt={`${title} cover`}
          className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90"
          blurData={base64}
          sizes={imageSizes ?? "20vw"}
          fill
          default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
        />
        <BookCoverOverlay />
        <HoverOverlay info={{ author, title }} size={size} />
        <InfoOverlay ratingValue={ratingValue} status={status} />
      </div>

      <p className={cn("font-semibold text-ellipsis whitespace-nowrap max-w-full text-[12px] md:text-[13px] overflow-hidden capitalize group-hover:opacity-50 transition-opacity duration-300", { "text-[13px] md:text-[14px]": isLarge })}>
        {title}
      </p>
    </>
  )
}

export default NovelCard;
