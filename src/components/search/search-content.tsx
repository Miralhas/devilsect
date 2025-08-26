'use client'

import { env } from "@/env";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DynamicBlurImage from "../dynamic-blur-image";
import { NOVELS_DATA } from "../home/new-releases/data";
import BookCoverOverlay from "../novel-card/book-cover-overlay";
import HoverOverlay from "../novel-card/hover-overlay";
import InfoOverlay from "../novel-card/info-overlay";

const SearchContent = () => {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page");

  return (
    <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {NOVELS_DATA.map(novel => (
        <Link href={`/novels/${novel.slug}`} key={novel.id} className="relative group">
          <div className="relative aspect-[2/3] overflow-hidden rounded-r-md shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-md shadow-accent">
            <DynamicBlurImage
              src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
              alt={`${novel.title} cover`}
              className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90"
              sizes={"(max-width: 768px) 30vw, 10vw"}
              fill
            />
            <BookCoverOverlay />
            <HoverOverlay info={{ author: novel.author, title: novel.title }} size="lg" />
            <InfoOverlay ratingValue={novel.ratingValue} status={novel.status} />
          </div>

          <p className={cn("font-semibold text-ellipsis whitespace-nowrap max-w-full text-[12px] md:text-[13px] overflow-hidden capitalize group-hover:opacity-50 transition-opacity duration-300", { "text-[13px] md:text-[14px]": !isMobile })}>
            {novel.title}
          </p>
        </Link>
      ))}
    </section>
  )
}

export default SearchContent;
