import { FixChapterRequest } from "@/types/request";
import Link from "next/link";

const FixChapterRequestCard = ({ request }: { request: FixChapterRequest }) => {
  const { chapterInfoDTO: chapter, errors } = request;
  return (
    <>
      <p className="text-zinc-300">
        Requests bug fixes on chapter
        {" "}
        <Link href={`/novels/${chapter.novelSlug}/${chapter.chapterSlug}`} className="underline text-zinc-200">{chapter.chapterTitle}</Link>
        {" "}
        from the novel <Link href={`/novels/${chapter.novelSlug}`} className="capitalize underline text-zinc-200">{chapter.novelTitle}</Link>
      </p>
      <p className="font-light text-zinc-300 text-xs mt-3">Errors:</p>
      <div className="px-5.5">
        <ol className="list-decimal">
          {errors.map(error => (
            <li key={error.id}>
              <span className="font-semibold text-sm">{error.name}</span>
              {" "}
              <span className="text-zinc-300 text-xs text-[13px]">{error.description}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default FixChapterRequestCard;
