import { Button } from "@/components/ui/button";
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
          className="chapter-body font-atkinson max-w-none scroll-mt-[100px] text-[rgb(224_224_224)] text-[18px] space-y-[1rem] text-shadow-none"
          style={{ wordWrap: "break-word" }}
          dangerouslySetInnerHTML={{ __html: chapter.body }}
        >
        </div>

        <div className="w-full flex items-center justify-between mt-14">
          {hasPrevious ? (
            <Button variant="cool" size="lg" asChild className="rounded-none w-full max-w-[200px]">
              <Link href={`/novels/${chapter.novelSlug}/${previous.slug}`}>Previous Chapter</Link>
            </Button>
          ) : null}

          {hasNext ? (
            <Button variant="cool" size="lg" asChild className="rounded-none w-full max-w-[200px]">
              <Link href={`/novels/${chapter.novelSlug}/${next.slug}`}>Next Chapter</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ChapterBody;
