import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Chapter } from "@/types/chapter";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ChapterAccordionContent from "./chapter-accordion-content";
import { MAX_CHAPTERS_PER_BUTTON } from "./chapters-accordion";


type ChapterAccordionItemProps = {
  index: number;
  currentChapter: Chapter;
  setAccordionValue: Dispatch<SetStateAction<string | undefined>>;
  accordionValue?: string;
  isLast: boolean;
}

const ChapterAccordionItem = ({ index, currentChapter, setAccordionValue, accordionValue, isLast }: ChapterAccordionItemProps) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const initialChunkChapter = MAX_CHAPTERS_PER_BUTTON * index + 1;
  const lastChunkChapter = isLast ? (currentChapter.novelChaptersCount)
    : (MAX_CHAPTERS_PER_BUTTON + MAX_CHAPTERS_PER_BUTTON * index);

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
          <ChapterAccordionContent
            currentChapter={currentChapter}
            page={index}
            accordionRef={accordionRef}
            accordionValue={accordionValue}
          />
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default ChapterAccordionItem;
