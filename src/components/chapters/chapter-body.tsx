'use client'

import { Button } from "@/components/ui/button";
import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import useAutoScroll from "@/hooks/use-auto-scroll";
import { useAddChapterToUserHistory } from "@/service/library/mutations/add-chapter-to-user-history";
import { User } from "@/types/authentication";
import { Chapter } from "@/types/chapter";
import { ChevronLeft, ChevronRight, HouseIcon } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DisabledLink from "../disabled-link";
import ChapterContent from "./chapter-content";
import Settings from "./settings";

const ChapterBody = ({ chapter, shallowUser }: { chapter: Chapter; shallowUser: User | undefined }) => {
  const { previous, next, novelStatus } = chapter;
  const [isNavHidden, setIsNavHidden] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const divRef = useRef<HTMLDivElement>(null);
  const chapterContentRef = useRef<HTMLDivElement>(null);
  const { autoScroll } = useReaderSettingsContext();
  const mutation = useAddChapterToUserHistory();
  const { onAutoScrollPauseChange, autoScrollPause } = useAutoScroll(chapterContentRef);

  useEffect(() => {
    if (shallowUser) {
      mutation.mutate(chapter);
    }

    if (autoScroll.active) {
      autoScrollPause();
    }

    // eslint-disable-next-line
  }, [chapter]);


  const hasNext = next !== null;
  const hasPrevious = previous !== null;
  const novelIsOngoing = novelStatus === "ON_GOING";

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
        <ChapterContent content={chapter.body} title={chapter.title} onClickCallback={() => {
          setIsNavHidden(prev => !prev);
          onAutoScrollPauseChange();
        }} />

        <div className="w-full grid grid-cols-[repeat(3,minmax(0px,100px))] gap-4 my-16 items-center justify-center" ref={chapterContentRef}>
          <Button variant="pure" asChild size="none" className="col-span-1 bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10">
            <DisabledLink href={`/novels/${chapter.novelSlug}/${previous?.slug}`} className="pr-1" disabled={!hasPrevious}>
              <div className="flex items-center w-full justify-center">
                <ChevronLeft className="size-5 md:size-6" strokeWidth={4} />
                <span className="text-sm text-[15px] md:text-base md:text-[17px]">Prev</span>
              </div>
            </DisabledLink>
          </Button>

          <Button variant="pure" asChild size="none" className="col-span-1 bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10">
            <Link href={`/novels/${chapter.novelSlug}`}>
              <div className="flex items-center w-full justify-center gap-1">
                <HouseIcon className="size-4.5" strokeWidth={3} />
                <span className="md:text-base md:text-[17px]">Index</span>
              </div>
            </Link>
          </Button>

          <Button variant="pure" asChild size="none" className="col-span-1 bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10">
            <DisabledLink
              href={novelIsOngoing && !hasNext ? `/novels/${chapter.novelSlug}/request` : `/novels/${chapter.novelSlug}/${next?.slug}`}
              className="pl-2"
              disabled={!hasNext && !novelIsOngoing}
            >
              <div className="flex items-center w-full justify-center">
                <span className="text-sm text-[15px] md:text-base md:text-[17px]">Next</span>
                <ChevronRight className="size-5 md:size-6" strokeWidth={4} />
              </div>
            </DisabledLink>
          </Button>
        </div>
      </div>
      <Settings chapter={chapter} divRef={divRef} isNavHidden={isNavHidden} setIsNavHidden={setIsNavHidden} />
    </div>
  )
}

export default ChapterBody;
