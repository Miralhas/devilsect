import { ChapterRequest } from "@/types/request";
import Link from "next/link";

const ChapterRequestCard = ({ request }: { request: ChapterRequest }) => {
  const { novel: { title, slug, chaptersCount } } = request;
  return (
    <>
      <p className="inline-block text-zinc-300">
        Requests more chapter for novel: <Link href={`/novels/${slug}`} className="capitalize underline text-zinc-200">{title}</Link>
      </p>
      <p className="capitalize text-zinc-300/90">{title} has currently {chaptersCount} chapters.</p>
    </>
  )
}

export default ChapterRequestCard;
