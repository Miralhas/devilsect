import {
  Accordion
} from "@/components/ui/accordion";
import { arrayChunker } from "@/lib/utils";
import { Chapter, ChapterSummary } from "@/types/chapter";
import { PaginatedQuery } from "@/types/pagination";
import { useState } from "react";
import ChapterAccordionItem from "./chapter-accordion-item";

type ChapterAccordionProps = {
  paginatedSumaries: PaginatedQuery<ChapterSummary[]>;
  currentChapter: Chapter;
};

const ChapterAccordion = ({ paginatedSumaries, currentChapter }: ChapterAccordionProps) => {
  const [accordionValue, setAccordionValue] = useState<string | undefined>();

  return (
    <div className="w-full space-y-2">
      <Accordion
        type="single"
        collapsible
        className="w-full pt-1"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        {paginatedSumaries?.results &&
          arrayChunker(paginatedSumaries.results, 100).map((chapterSummaryArr, index) => (
            <ChapterAccordionItem
              key={index}
              chapterSummaryArr={chapterSummaryArr}
              index={index}
              currentChapter={currentChapter} setAccordionValue={setAccordionValue}
              accordionValue={accordionValue}
            />
          ))
        }
      </Accordion>
    </div>
  )
}

export default ChapterAccordion;