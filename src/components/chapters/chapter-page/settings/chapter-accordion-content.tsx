import { cn } from "@/lib/utils";
import { Chapter, ChapterSummary } from "@/types/chapter";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useRef } from "react";

type ChapterAccordionContentProps = {
  currentChapter: Chapter;
  accordionChapter: ChapterSummary;
}

const ChapterAccordionContent = ({ accordionChapter, currentChapter }: ChapterAccordionContentProps) => {
  const chapterLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // scroll into current chapter inside the accordion
    if (currentChapter.id === accordionChapter.id && chapterLinkRef.current) {
      const id = setTimeout(() => {
        chapterLinkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);

      return () => clearTimeout(id);
    }
  }, [accordionChapter, currentChapter]);

  return (
    <>
      <Link
        href={`/novels/${currentChapter.novelSlug}/${accordionChapter.slug}`} 
        className="border-b-2 p-2.5 hover:bg-secondary"
        key={accordionChapter.id}
        ref={chapterLinkRef}
      >
        <p className={cn("text-white text-base font-semibold line-clamp-1 w-full max-w-[300px]", {"text-accent": accordionChapter.id === currentChapter.id})}>
          {accordionChapter.title}
        </p>
        <span className="mr-2 text-[11px] text-muted-foreground">Chapter: {accordionChapter.number}</span>
        <span className="text-[11px] text-muted-foreground">{format(new Date(accordionChapter.createdAt), 'MM/dd/yyyy')}</span>
      </Link>
    </>
  )
}

export default ChapterAccordionContent;
