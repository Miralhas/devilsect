'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Novel } from "@/types/novel";
import { useRef, useState } from "react";
import ChapterAccordionContent from "./chapters-accordion-content";

const MAX_CHAPTERS_PER_BUTTON = 100;

const NovelChapters = ({ novel }: { novel: Novel }) => {
  const [sort, setSort] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const totalButtons = Math.ceil(novel.chaptersCount / MAX_CHAPTERS_PER_BUTTON);

  return (
    <div className="space-y-3 grid">
      <Select value={sort} onValueChange={(val) => setSort(val as "NEWEST" | "OLDEST")}>
        <SelectTrigger className="w-full max-w-[100px] col-span-1 self-center justify-self-end">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sorts</SelectLabel>
            <SelectItem value="NEWEST">Newest</SelectItem>
            <SelectItem value="OLDEST">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
    </div>
  )
}

const Item = ({ isLast, novel, index }: { isLast: boolean; novel: Novel; index: number }) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <AccordionItem value={`item-${index}`} ref={accordionRef}>
        <AccordionTrigger className="p-4 rounded-none rounded-t-md bg-secondary w-full text-base items-center cursor-pointer hover:no-underline">
          <div className="flex gap-3 items-center font-bold">
            <p className="size-[32px] flex items-center justify-center text-white bg-zinc-700/50 rounded-sm">{index + 1}</p>
            <p className="text-lg">
              {MAX_CHAPTERS_PER_BUTTON * index + 1} - {isLast ? (novel.chaptersCount) : (MAX_CHAPTERS_PER_BUTTON + MAX_CHAPTERS_PER_BUTTON * index)}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance bg-secondary">
          <ChapterAccordionContent page={index} slug={novel.slug} accordionRef={accordionRef} />
        </AccordionContent>
      </AccordionItem>
    </>
  )
}


export default NovelChapters;
