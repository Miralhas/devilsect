import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { ChapterSummary } from "@/types/chapter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  novelSlug: string;
  previous: ChapterSummary | null;
  next: ChapterSummary | null;
}

const Header = ({ novelSlug: slug, next, previous }: HeaderProps) => {
  const hasNext = next !== null;
  const hasPrevious = previous !== null
  return (
    <div className="w-full">
      <div className="max-w-[840px] mx-auto">
        <div className="flex justify-between p-3 items-center">
          <Link
            href={`/novels/${slug}`}
            className="transition-all ease-in hover:underline flex items-center gap-2">
            <Image
              alt="cover"
              src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
              width={30}
              height={40}
              className="object-cover inline-block indent-[100%] whitespace-nowrap overflow-hidden"
            />
            <p className="capitalize font-bold text-sm text-[15px] leading-7 text-white">{slug.replaceAll("-", " ")}</p>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              className={cn("p-1 items-center justify-center rounded-full border-2 border-[#424242] text-white", {"border-accent": hasPrevious})}
              variant="pure"
              size="none"
              disabled={!hasPrevious}
            >
              <Link href={`/novels/${slug}/${previous?.slug}`}><ChevronLeft className="size-6 relative right-[1px]" strokeWidth={3} /></Link>
            </Button>

            <Button
              className={cn("p-1 items-center justify-center rounded-full border-2 border-[#424242] text-white", {"border-accent": hasNext})}
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
