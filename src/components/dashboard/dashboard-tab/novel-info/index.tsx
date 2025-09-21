import { Novel } from "@/types/novel";
import UpdateNovelForm from "./update-novel-form";

const NovelInfo = ({ novel }: { novel: Novel }) => {
  return (
    <div className="pt-4">
      <UpdateNovelForm novel={novel} />
    </div>
  )
}

export default NovelInfo;
