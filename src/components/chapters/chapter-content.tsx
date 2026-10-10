'use client'

import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import useCheckpoint from "@/hooks/use-checkpoint";
import { Chapter } from "@/types/chapter";
import { cn } from "@/utils/common-utils";

type Props = {
  onClickCallback: () => void;
  chapter: Chapter;
}


const ChapterContent = ({ chapter, onClickCallback }: Props) => {
  const { fontSize, lineHeight, fontFamily, textColor, opacity } = useReaderSettingsContext();
  const opacityDecimal = (opacity / 100);
  const { title, body } = chapter;
  useCheckpoint(chapter);

  return (
    <>
      <h2 className="capitalize text-center text-white/95 text-xl md:text-2xl font-tilt-warp mb-4 translate">{title}</h2>
      <div
        className={cn("chapter-body translate max-w-none scroll-mt-[100px] text-pretty text-shadow-none px-1 space-y-4", fontFamily)}
        style={{
          wordWrap: "break-word",
          fontSize: fontSize,
          lineHeight: `${lineHeight}px`,
          color: textColor.color,
          opacity: opacityDecimal,
        }}
        dangerouslySetInnerHTML={{ __html: body }}
        onClick={onClickCallback}
        id="chapter-content"
      >
      </div>
    </>
  )
}

export default ChapterContent;
