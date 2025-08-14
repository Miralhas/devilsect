import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Novel } from "@/types/novel";
import { useState } from "react";
import ChapterAccordionContent from "./chapter-accordion-content";
import Sort from "./sort";

const MAX_CHAPTERS_PER_BUTTON = 100;

const ChaptersTab = ({ novel }: { novel: Novel }) => {
  const [sort, setSort] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const totalButtons = Math.ceil(novel.chaptersCount / MAX_CHAPTERS_PER_BUTTON);

  return (
    <section className="w-full max-w-[1024px] mx-auto space-y-4">
      <Sort novel={novel} setSort={setSort} sort={sort} />
      <Accordion
        type="single"
        collapsible
        className="flex gap-3 flex-col"
      >
        {sort === "NEWEST" ? (
          Array.from({ length: totalButtons }).map((_, index) => {
            const isLast = index + 1 === totalButtons;
            return <Item index={index} isLast={isLast} novel={novel} key={index} />
          })
        ) : (
          Array.from({ length: totalButtons }).map((_, index) => {
            const isLast = index + 1 === totalButtons;
            return <Item index={index} isLast={isLast} novel={novel} key={index} />
          }).toReversed()
        )}
      </Accordion>
    </section>
  )
}

const Item = ({ isLast, novel, index }: { isLast: boolean; novel: Novel; index: number }) => {
  return (
    <>
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="p-4 rounded-none rounded-t-md bg-secondary w-full text-base items-center cursor-pointer hover:no-underline">
          <div className="flex gap-3 items-center font-bold">
            <p className="size-[32px] flex items-center justify-center text-white bg-zinc-700/50 rounded-sm">{index + 1}</p>
            <p className="text-lg">
              {MAX_CHAPTERS_PER_BUTTON * index + 1} - {isLast ? (novel.chaptersCount) : (MAX_CHAPTERS_PER_BUTTON + MAX_CHAPTERS_PER_BUTTON * index)}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-secondary">
          <ChapterAccordionContent page={index} slug={novel.slug} />
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default ChaptersTab;
