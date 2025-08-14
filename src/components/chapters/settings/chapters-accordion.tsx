import {
  Accordion
} from "@/components/ui/accordion";
import { Chapter } from "@/types/chapter";
import { useState } from "react";
import ChapterAccordionItem from "./chapter-accordion-item";

type ChapterAccordionProps = {
  currentChapter: Chapter;
};

export const MAX_CHAPTERS_PER_BUTTON = 100;

const ChapterAccordion = ({ currentChapter }: ChapterAccordionProps) => {
  const [accordionValue, setAccordionValue] = useState<string | undefined>();
  const totalButtons = Math.ceil(currentChapter.novelChaptersCount / MAX_CHAPTERS_PER_BUTTON);

  return (
    <div className="w-full space-y-2">
      <Accordion
        type="single"
        collapsible
        className="w-full pt-1"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        {Array.from({ length: totalButtons }).map((_, index) => {
          const isLast = index + 1 === totalButtons;
          return (
            <ChapterAccordionItem
              currentChapter={currentChapter}
              index={index}
              isLast={isLast}
              setAccordionValue={setAccordionValue}
              accordionValue={accordionValue}
              key={index}
            />
          )
        })}
      </Accordion>
    </div>
  )
}

export default ChapterAccordion;