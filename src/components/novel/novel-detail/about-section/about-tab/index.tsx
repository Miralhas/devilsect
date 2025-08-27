import { BookOpenText, UserIcon } from "lucide-react";
import NovelDescription from "./novel-description";
import NovelSummary from "./novel-summary";
import NovelTags from "./novel-tags";
import { Novel } from "@/types/novel";

const AboutTab = ({ novel }: { novel: Novel }) => {
  return (
    <div className="w-full max-w-[1024px] mx-auto space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:gap-34">
          <div className="space-y-1 flex md:flex-col gap-2 md:gap-0 order-2 md:order-none">
            <div className="flex items-center gap-1">
              <BookOpenText className="size-4 mt-0.25 text-muted-foreground" />
              <p className="text-muted-foreground text-sm md:text-[15px] font-medium tracking-tight">Chapters</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm md:text-base font-semibold line-clamp-1 mb-0.5">{novel.chaptersCount} Chapters</p>
            </div>
          </div>

          <div className="space-y-1 flex md:flex-col gap-2 md:gap-0">
            <div className="flex items-center gap-1">
              <UserIcon className="size-4 text-muted-foreground" />
              <p className="text-muted-foreground text-sm md:text-[15px] font-medium tracking-tight">Author</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{novel.author}</p>
            </div>
          </div>
        </div>
        <NovelDescription novel={novel} />
      </div>
      <NovelSummary description={novel.description} />
      <NovelTags tags={novel.tags} />
    </div>
  )
}

export default AboutTab;
