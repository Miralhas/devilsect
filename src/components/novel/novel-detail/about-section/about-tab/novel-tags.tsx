import NovelBadge from "../../info-section/novel-badge";
import ShowMore from "./show-more";

const NovelTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p className="text-xl md:text-2xl font-semibold">Tags</p>
        <div className="w-full h-[2px] bg-zinc-50/7 mt-1.75"></div>
      </div>
      <ShowMore maxLines={4} containerClassName="space-x-2.5 md:space-x-4 md:space-y-5">
        {tags.map(tag => (
          <NovelBadge
            key={tag}
            name={tag}
            variant="secondary"
            className="leading-6 tracking-tighter font-semibold capitalize"
            href={`/tags/${tag.toLowerCase()}`}
          />
        ))}
      </ShowMore>
    </div>
  )
}

export default NovelTags;
