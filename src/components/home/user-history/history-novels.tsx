import { Library } from "@/types/library";
import HistoryNovel from "./history-novel";
import Link from "next/link";

const HistoryNovels = ({ library }: { library: Library[] }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {library.map((item) => (
        <Link
          href={`/novels/${item.novelSlug}/${item.chapterSlug}`}
          key={item.libraryElementId}
          className="relative group col-span-1 space-y-1">
          <HistoryNovel library={item} key={item.libraryElementId} />
        </Link>
      ))}
    </div>
  )
}

export default HistoryNovels;
