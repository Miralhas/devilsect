import { cn } from "@/lib/utils";
import { useGetNovelChapterSummaries } from "@/services/chapters/client-queries";
import { Chapter } from "@/types/chapter";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
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

  useEffect(() => {
    // scroll to the start of the accordion or to the current chapter link, if any
    if (accordionValue === String(page) && accordionRef.current && !chapters.isLoading) {
      const id = setTimeout(() => {
        if (chapterLinkRef.current) {
          chapterLinkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        accordionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
      return () => clearTimeout(id);
    }

  }, [accordionValue, page, accordionRef, chapters.isLoading]);

  if (chapters.isError || chapters.isLoading) {
    return <Loading />
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

const Loading = () => {
  return (
    <div className="grid min-h-[5vh] place-items-center">
      <Loader className="size-7 animate-spin" />
    </div>
  )
}

export default ChapterAccordionContent;
