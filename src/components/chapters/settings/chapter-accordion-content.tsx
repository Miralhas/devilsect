import SpinnerLoader from "@/components/ui/spinner-loader";
import { cn } from "@/lib/utils";
import { useGetNovelChapterSummaries } from "@/service/chapters/queries/use-get-novel-chapter-summaries";
import { Chapter } from "@/types/chapter";
import { format } from "date-fns";
import Link from "next/link";
import { RefObject, useLayoutEffect, useRef } from "react";
import { MAX_CHAPTERS_PER_BUTTON } from "./chapters-accordion";

type ChapterAccordionContentProps = {
  currentChapter: Chapter;
  page: number;
  accordionValue?: string;
  accordionRef: RefObject<HTMLDivElement | null>;
}

const ChapterAccordionContent = ({ currentChapter, page, accordionRef, accordionValue }: ChapterAccordionContentProps) => {
  const chapters = useGetNovelChapterSummaries({ page, novelSlug: currentChapter.novelSlug, size: MAX_CHAPTERS_PER_BUTTON, });
  const chapterLinkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    // scroll to the start of the accordion or to the current chapter link, if any
    if (accordionRef.current && !chapters.isLoading) {
      const timer = setTimeout(() => {
        if (chapterLinkRef.current) {
          chapterLinkRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          accordionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 450);

      return () => clearTimeout(timer);
    }

  }, [accordionValue, page, accordionRef, chapters.isLoading]);

  if (chapters.isError || chapters.isLoading) {
    return <SpinnerLoader containerClassName="min-h-[5vh]" loaderClassName="size-7" />
  }

  return (
    <>
      {chapters.data?.results.map(chapter => (
        <Link
          href={`/novels/${currentChapter.novelSlug}/${chapter.slug}`}
          className="border-b-2 p-2.5 hover:bg-secondary"
          ref={chapter.id === currentChapter.id ? chapterLinkRef : undefined}
          key={chapter.id}
        >
          <p className={cn("text-white text-base font-semibold line-clamp-1 w-full max-w-[300px]", { "text-accent": chapter.id === currentChapter.id })}>
            {chapter.title}
          </p>
          <span className="mr-2 text-[11px] text-muted-foreground">Chapter: {chapter.number}</span>
          <span className="text-[11px] text-muted-foreground">{format(new Date(chapter.createdAt), 'MM/dd/yyyy')}</span>
        </Link>
      ))}
    </>
  )
}

export default ChapterAccordionContent;
