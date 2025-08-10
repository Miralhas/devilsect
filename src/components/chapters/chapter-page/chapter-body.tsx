'use client'

import { Chapter } from "@/types/chapter";
import Link from "next/link";
import { useRef } from "react";
import Settings from "./settings";
import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";

const ChapterBody = ({ chapter }: { chapter: Chapter }) => {
  const { previous, next } = chapter;
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
        >
        </div>

        <div className="w-full flex items-center gap-4 justify-between mt-14">
          {hasPrevious ? (
            <Link className="bg-primary/70 border border-accent/90 rounded-sm hover:bg-primary/60 focus-visible:border-neutral-400 focus-visible:ring-neutral-400/5 p-5 w-full text-center max-w-[200px]" href={`/novels/${chapter.novelSlug}/${previous.slug}`}>Previous Chapter</Link>
          ) : null}

          {hasNext ? (
            <Link className="bg-primary/70 border border-accent/90 rounded-sm hover:bg-primary/60 focus-visible:border-neutral-400 focus-visible:ring-neutral-400/5 p-5 w-full text-center max-w-[200px] ms-auto" href={`/novels/${chapter.novelSlug}/${next.slug}`}>Next Chapter</Link>
          ) : null}
        </div>
      </div>
      <Settings chapter={chapter} divRef={divRef} />
    </div>
  )
}

export default ChapterBody;
