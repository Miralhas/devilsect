'use client'

import { Button } from "@/components/ui/button";
import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { cn } from "@/lib/utils";
import { useAddChapterToUserHistoryMutation } from "@/services/user-library/client-mutation";
import { Chapter } from "@/types/chapter";
import { ChevronLeft, ChevronRight, HouseIcon } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Settings from "./settings";
import useAutoScroll from "@/hooks/use-auto-scroll";

const ChapterBody = ({ chapter }: { chapter: Chapter }) => {
  const { previous, next } = chapter;
  const [isNavHidden, setIsNavHidden] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const divRef = useRef<HTMLDivElement>(null);
  const chapterContentRef = useRef<HTMLDivElement>(null);
  const { fontSize, lineHeight, fontFamily, textColor, opacity, autoScroll } = useReaderSettingsContext();
  const mutation = useAddChapterToUserHistoryMutation();
  const { onAutoScrollPauseChange, autoScrollPause } = useAutoScroll(chapterContentRef);

  useEffect(() => {
    mutation.mutate({ chapter });
    if (autoScroll.active) {
      autoScrollPause();
    }

    // eslint-disable-next-line
  }, [chapter]);

  const opacityDecimal = (opacity / 100);

  const hasNext = next !== null;
  const hasPrevious = previous !== null;

  return (
    <div className="w-full relative" ref={divRef}>
      <motion.div
        id="scroll-indicator"
        className="bg-primary fixed z-[2] will-change-transform backface-hidden"
        style={{
          scaleX: scaleX,
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          originX: 0,
        }}
      />
      <div className="w-full px-4 max-w-[840px] mx-auto relative">
        <h2 className="capitalize text-center text-white/95 text-xl md:text-2xl font-tilt-warp mb-4">{chapter.title}</h2>
        <div
          className={cn("chapter-body max-w-none scroll-mt-[100px] text-[16px] md:text-[18px] space-y-[1rem] text-shadow-none px-1", fontFamily)}
          style={{
            wordWrap: "break-word",
            fontSize: fontSize,
            lineHeight: `${lineHeight}px`,
            color: textColor.color,
            opacity: opacityDecimal,
          }}
          dangerouslySetInnerHTML={{ __html: chapter.body }}
          onClick={() => {
            setIsNavHidden(prev => !prev);
            onAutoScrollPauseChange();
          }}
        >
        </div>

        <div className="w-full grid grid-cols-[repeat(3,minmax(0px,100px))] gap-4 my-16 items-center justify-center" ref={chapterContentRef}>
          <Button variant="pure" size="none" className="col-span-1 bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10" disabled={!hasPrevious} >
            <Link href={`/novels/${chapter.novelSlug}/${previous?.slug}`} className="pr-1">
              <div className="flex items-center w-full justify-center">
                <ChevronLeft className="size-5 md:size-6" strokeWidth={4} />
                <span className="text-sm text-[15px] md:text-base md:text-[17px]">Prev</span>
              </div>
            </Link>
          </Button>

          <Button variant="pure" size="none" className="col-span-1 bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10">
            <Link href={`/novels/${chapter.novelSlug}`}>
              <div className="flex items-center w-full justify-center gap-1">
                <HouseIcon className="size-4.5" strokeWidth={3} />
                <span className="md:text-base md:text-[17px]">Index</span>
              </div>
            </Link>
          </Button>

          <Button variant="pure" size="none" className="col-span-1 bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10" disabled={!hasNext} >
            <Link href={`/novels/${chapter.novelSlug}/${next?.slug}`} className="pl-2">
              <div className="flex items-center w-full justify-center">
                <span className="text-sm text-[15px] md:text-base md:text-[17px]">Next</span>
                <ChevronRight className="size-5 md:size-6" strokeWidth={4} />
              </div>
            </Link>
          </Button>
        </div>
      </div>
      <Settings chapter={chapter} divRef={divRef} isNavHidden={isNavHidden} setIsNavHidden={setIsNavHidden} />
    </div>
  )
}

export default ChapterBody;
