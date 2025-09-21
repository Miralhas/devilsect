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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MAX_CHAPTERS_PER_BUTTON = 100;

const NovelChapters = ({ novel }: { novel: Novel }) => {
  const [goto, setGoto] = useState<number>(0);
  const [sort, setSort] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const totalButtons = Math.ceil(novel.chaptersCount / MAX_CHAPTERS_PER_BUTTON);
  const router = useRouter();

  const handleSetGoto = (val: string) => {
    if (isNaN(Number(val))) {
      return setGoto(0);
    }
    return setGoto(Number(val));
  }

  const onGo = () => {
    const slugArr = novel.firstChapter.slug.split("-");
    slugArr[2] = goto > novel.chaptersCount ? novel.chaptersCount.toString() : goto.toString();
    const slug = slugArr.join("-");
    router.push(`/dashboard/${novel.slug}/${slug}`);
  }

  return (
    <div className="space-y-3 grid">
      <div className="w-full grid grid-cols-2">
        <div className="space-y-1 col-span-1 col-start-1">
          <Label htmlFor="goto" className="text-xs text-muted-foreground">Go to chapter</Label>
          <div className="flex items-center gap-2">
            <Input id="goto" type="text" className="h-8 max-w-xs" value={goto} onChange={(e) => handleSetGoto(e.target.value)} />
            <Button className="" variant="cool-secondary" size="sm" disabled={!goto} onClick={onGo}>Go</Button>
          </div>
        </div>
        <Select value={sort} onValueChange={(val) => setSort(val as "NEWEST" | "OLDEST")}>
          <SelectTrigger className="w-full max-w-[100px] col-span-1 col-start-2 self-center justify-self-end">
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
      </div>
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
