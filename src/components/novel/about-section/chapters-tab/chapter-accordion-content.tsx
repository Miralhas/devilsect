import SpinnerLoader from "@/components/ui/spinner-loader";
import { useGetNovelChapterSummaries } from "@/services/chapters/client-queries";
import { format } from "date-fns";
import Link from "next/link";
import { RefObject, useEffect } from "react";

const ChapterAccordionContent = ({ page, slug, accordionRef }: { page: number, slug: string; accordionRef: RefObject<HTMLDivElement | null> }) => {
  const chapters = useGetNovelChapterSummaries({ page, novelSlug: slug, size: 100, });

  useEffect(() => {
    if (accordionRef.current && !chapters.isLoading) {
      const id = setTimeout(() => {
        accordionRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
      }, 250);

      return () => clearTimeout(id);
    }
    
  }, [page, accordionRef, chapters.isLoading])

  if (chapters.isError || chapters.isLoading) {
    return <SpinnerLoader containerClassName="min-h-[10vh]" loaderClassName="size-7" />
  }

  return (
    <div className="grid md:grid-cols-2 pt-5 pb-3 px-7 gap-4 border-t">
      {chapters.data?.results.map(chapter => (
        <Link href={`/novels/${slug}/${chapter.slug}`} className="col-span-1 w-full border-b border-b-zinc-50/10 pb-3 transition-opacity duration-200 ease-in-out hover:opacity-70" key={chapter.id}>
          <p className="text-base tracking-tight font-semibold leading-5 line-clamp-1 w-full">
            {chapter.title}
          </p>
          <span className="mr-1 text-[11px] text-muted-foreground">Chapter: {chapter.number}</span>
          <span className="text-[11px] text-muted-foreground">- {format(new Date(chapter.createdAt), 'MM/dd/yyyy')}</span>
        </Link>
      ))}
    </div>
  )
}

export default ChapterAccordionContent;
