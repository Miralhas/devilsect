import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { ChapterSummary } from "@/types/chapter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import DynamicBlurImage from "../dynamic-blur-image";

type HeaderProps = {
  novelSlug: string;
  previous: ChapterSummary | null;
  next: ChapterSummary | null;
}

const Header = ({ novelSlug: slug, next, previous }: HeaderProps) => {
  const hasNext = next !== null;
  const hasPrevious = previous !== null;
  return (
    <div className="w-full">
      <div className="max-w-[840px] mx-auto px-2">
        <div className="flex justify-between p-3 items-center gap-5">
          <Link
            href={`/novels/${slug}`}
            className="transition-all ease-in hover:underline flex items-center gap-2">
            <div className="relative h-[42px] aspect-[2/3]">
              <DynamicBlurImage
                fill
                sizes="(max-width: 1024px) 10vw, 5vw"
                alt="cover"
                src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
                className="object-fill rounded-xs"
                default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
              />
            </div>
            <p className="capitalize font-bold text-sm leading-4 md:text-[15px] line-clamp-1 text-white">{slug.replaceAll("-", " ")}</p>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              className={cn("p-1 items-center justify-center rounded-full border-2 border-[#424242] text-white", { "border-accent": hasPrevious })}
              variant="pure"
              size="none"
              disabled={!hasPrevious}
            >
              <Link href={`/novels/${slug}/${previous?.slug}`}><ChevronLeft className="size-6 relative right-[1px]" strokeWidth={3} /></Link>
            </Button>

            <Button
              className={cn("p-1 items-center justify-center rounded-full border-2 border-[#424242] text-white", { "border-accent": hasNext })}
              variant="pure"
              size="none"
              disabled={!hasNext}
            >
              <Link href={`/novels/${slug}/${next?.slug}`}><ChevronRight className="size-6 relative left-[1px] bottom-[1px]" strokeWidth={3} /></Link>
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-[#424242]" />
    </div>
  )
}

export default Header;
