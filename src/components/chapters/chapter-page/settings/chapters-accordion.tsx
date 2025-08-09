import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { arrayChunker } from "@/lib/utils";
import { ChapterSummary } from "@/types/chapter";
import { PaginatedQuery } from "@/types/pagination";
import { format } from "date-fns";
import Link from "next/link";

const ChapterAccordion = ({ paginatedSumaries }: { paginatedSumaries: PaginatedQuery<ChapterSummary[]> }) => {
  return (
    <div className="w-full space-y-2">
      <Accordion
        type="single"
        collapsible
        className="w-full pt-1"
      >
        {arrayChunker(paginatedSumaries!.results, 100).map((chapterSummaryArr, index) => (
          <AccordionItem value={String(index)} key={index} className="tracking-tight">
            <AccordionTrigger className="[&[data-state=open]]:bg-secondary p-4 text-[15px] text-white font-semibold">
              {chapterSummaryArr[0].number} - {chapterSummaryArr[chapterSummaryArr.length - 1].number}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance first:mt-3">
              {chapterSummaryArr.map(chapter => (
                <Link href="/" key={chapter.id} className="border-b-2 px-4 pb-4">
                  <span className="text-white text-base font-semibold line-clamp-1">
                    {chapter.title}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{format(new Date(chapter.createdAt), 'MM/dd/yyyy')}</span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ChapterAccordion;