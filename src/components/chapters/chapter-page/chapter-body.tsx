'use client'

import { Chapter } from "@/types/chapter";
import Link from "next/link";
import { useRef, useState } from "react";
import Settings from "./settings";
import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const { fontSize, lineHeight, fontFamily, textColor, opacity } = useReaderSettingsContext();

  const opacityDecimal = (opacity / 100);

  const hasNext = next !== null;
  const hasPrevious = previous !== null;

  return (
    <div className="w-full relative" ref={divRef}>
      <motion.div
        id="scroll-indicator"
        className="bg-primary fixed z-[2]"
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
            opacity: opacityDecimal
          }}
          dangerouslySetInnerHTML={{ __html: chapter.body }}
          onTouchStart={() => setIsNavHidden(prev => !prev)}
        >
        </div>

        <div className="w-full flex items-center justify-center gap-8 my-14">
          <Button variant="pure" size="none" className="bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10" disabled={!hasPrevious} >
            <Link href={`/novels/${chapter.novelSlug}/${previous?.slug}`} className="pr-2">
              <div className="flex items-center w-full justify-center">
                <ChevronLeft className="size-6" strokeWidth={4} />
                <span className="text-lg">Prev</span>
              </div>
            </Link>
          </Button>

          <Button variant="pure" size="none" className="bg-gradient-to-r from-accent to-primary/70 max-w-[100px] w-full border border-accent rounded-sm h-10" disabled={!hasNext} >
            <Link href={`/novels/${chapter.novelSlug}/${next?.slug}`} className="pl-2">
              <div className="flex items-center w-full justify-center">
                <span className="text-lg mb-0.5">Next</span>
                <ChevronRight className="size-6" strokeWidth={4} />
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
