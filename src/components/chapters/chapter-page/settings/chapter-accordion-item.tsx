import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Chapter, ChapterSummary } from "@/types/chapter";
import ChapterAccordionContent from "./chapter-accordion-content";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";


type ChapterAccordionItemProps = {
  chapterSummaryArr: ChapterSummary[];
  index: number;
  currentChapter: Chapter;
  setAccordionValue: Dispatch<SetStateAction<string | undefined>>;
  accordionValue?: string;
}

const ChapterAccordionItem = ({ chapterSummaryArr, index, currentChapter, setAccordionValue, accordionValue }: ChapterAccordionItemProps) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const initialChunkChapter = chapterSummaryArr[0].number;
  const lastChunkChapter = chapterSummaryArr[chapterSummaryArr.length - 1].number;

  useEffect(() => {
    // scroll to the start of the newly open accordion
    if (accordionValue === String(index) && accordionRef.current) {
      const id = setTimeout(() => {
        accordionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);

      return () => clearTimeout(id);
    }
  }, [accordionValue, index])

  useEffect(() => {
    // if current chapter is between the first and last chapters of the current chapters chunk, then open this accordion
    if (currentChapter.number >= initialChunkChapter && currentChapter.number <= lastChunkChapter) {
      setAccordionValue(String(index));
    }
  }, [currentChapter.number, index, initialChunkChapter, lastChunkChapter, setAccordionValue]);

  return (
    <>
      <AccordionItem value={String(index)} className="tracking-tight" ref={accordionRef}>
        <AccordionTrigger className="[&[data-state=open]]:bg-secondary p-4 text-[15px] text-white font-semibold">
          {initialChunkChapter} - {lastChunkChapter}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col text-balance first:mt-2">
          {chapterSummaryArr.map(chapter => {
            return (
              <ChapterAccordionContent
                key={chapter.id}
                accordionChapter={chapter}
                currentChapter={currentChapter}
              />
            )
          })}
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default ChapterAccordionItem;
