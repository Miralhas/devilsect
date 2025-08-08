import { Chapter } from "@/types/chapter";
import Link from "next/link";

const ChapterBody = ({ chapter }: { chapter: Chapter }) => {
  const { previous, next } = chapter;
  const hasNext = next !== null;
  const hasPrevious = previous !== null;

  return (
    <div className="max-w-[840px] mx-auto">
      <div className="w-full px-4 pb-10">
        <h2 className="capitalize text-center text-white/95 text-xl md:text-2xl font-tilt-warp mb-4">{chapter.title}</h2>
        <div
          className="chapter-body font-atkinson max-w-none scroll-mt-[100px] text-[rgb(224_224_224)] text-[16px] md:text-[18px] space-y-[1rem] text-shadow-none px-1"
          style={{ wordWrap: "break-word" }}
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
    </div>
  )
}

export default ChapterBody;
