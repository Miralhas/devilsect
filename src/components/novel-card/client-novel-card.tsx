import { env } from "@/env";
import { cn } from "@/lib/utils";
import { NovelSummary } from "@/types/novel";
import DynamicBlurImage from "../dynamic-blur-image";
import BookCoverOverlay from "../novel-card/book-cover-overlay";
import HoverOverlay from "../novel-card/hover-overlay";
import InfoOverlay from "../novel-card/info-overlay";

export type Size = "sm" | "lg";

type NovelCardProps = {
  novel: NovelSummary;
  size?: Size;
  imageSizes?: string;
}

const ClientNovelCard = ({ novel, size = "lg", imageSizes = "20vw" }: NovelCardProps) => {
  const isLarge = size === "lg";
  return (
    <>
      <div className="relative aspect-[2/3] overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
        <DynamicBlurImage
          src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
          alt={`${novel.title} cover`}
          className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90"
          sizes={imageSizes}
          fill
          default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
        />
        <BookCoverOverlay />
        <HoverOverlay info={{ author: novel.author, title: novel.title }} size="lg" />
        <InfoOverlay ratingValue={novel.ratingValue} status={novel.status} />
      </div>

      <p className={cn("font-semibold text-ellipsis whitespace-nowrap max-w-full text-[12px] md:text-[13px] overflow-hidden capitalize group-hover:opacity-50 transition-opacity duration-300", { "text-[13px] md:text-[14px]": isLarge })}>
        {novel.title}
      </p>
    </>
  )
}

export default ClientNovelCard;
