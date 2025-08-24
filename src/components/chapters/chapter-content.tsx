import { useReaderSettingsContext } from "@/contexts/reader-settings-context";
import { cn } from "@/lib/utils";

type Props = {
  content: string;
  onClickCallback: () => void;
  title: string
}

const ChapterContent = ({ content, onClickCallback, title }: Props) => {
  const { fontSize, lineHeight, fontFamily, textColor, opacity, language } = useReaderSettingsContext();
  const opacityDecimal = (opacity / 100);

  let translatedChap = content;
  
  return (
    <>
      <h2 className="capitalize text-center text-white/95 text-xl md:text-2xl font-tilt-warp mb-4">{title}</h2>
      <div
        className={cn("chapter-body max-w-none scroll-mt-[100px] text-[16px] md:text-[18px] space-y-[1rem] text-shadow-none px-1", fontFamily)}
        style={{
          wordWrap: "break-word",
          fontSize: fontSize,
          lineHeight: `${lineHeight}px`,
          color: textColor.color,
          opacity: opacityDecimal,
        }}
        dangerouslySetInnerHTML={{ __html: translatedChap }}
        onClick={onClickCallback}
      >
      </div>
    </>
  )
}

export default ChapterContent;
