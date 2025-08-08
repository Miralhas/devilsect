import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/chapter";
import Link from "next/link";

const ChapterBody = ({ chapter }: { chapter: Chapter }) => {
  return (
    <div className="max-w-[840px] mx-auto">
      <div className="w-full px-4 pb-10">
        <h2 className="capitalize text-center text-white/95 text-xl md:text-2xl font-tilt-warp mb-4">{chapter.title}</h2>
        <div
          className="chapter-body font-atkinson max-w-none scroll-mt-[100px] text-[rgb(224_224_224)] text-[18px] space-y-[20px] text-shadow-none"
          style={{ wordWrap: "break-word" }}
          dangerouslySetInnerHTML={{ __html: chapter.body }}
        >
        </div>

        <div className="grid w-full place-items-center mt-14">
          <Button variant="cool" size="lg" asChild className="rounded-none">
            <Link href={`/novels/${chapter.slug}`}>Next Chapter</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChapterBody;
