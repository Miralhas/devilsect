import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/chapter";
import { cn } from "@/utils/common-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const PrevAndNextButtons = ({ next, previous, novelSlug }: Chapter) => {
  const hasNext = next !== null;
  const hasPrevious = previous !== null;

  return (
    <div className="flex gap-4 md:gap-6 items-center">
      <Button className="hover:underline" variant="pure" size="none" disabled={!hasPrevious}>
        <Link prefetch={hasPrevious} href={`/novels/${novelSlug}/${previous?.slug}`} className="flex items-center font-normal">
          <ChevronLeft className={cn("size-6 md:size-8", {})} />
          <span className="sr-only md:not-sr-only">Prev</span>
        </Link>
      </Button>
      <Button className="hover:underline" variant="pure" size="none" disabled={!hasNext}>
        <Link prefetch={hasNext} href={`/novels/${novelSlug}/${next?.slug}`} className="flex items-center font-normal">
          <span className="sr-only md:not-sr-only">Next</span>
          <ChevronRight className={cn("size-6 md:size-8", {})} />
        </Link>
      </Button>
    </div>
  )
}

export default PrevAndNextButtons;
