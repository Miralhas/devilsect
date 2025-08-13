import NovelBadge from "../info-section/novel-badge";
import ShowMore from "./show-more";

const NovelTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="space-y-3">
      <p className="text-xl md:text-2xl font-semibold">Tags</p>
      <ShowMore>
        {tags.map(tag => (
          <NovelBadge
            key={tag}
            name={tag}
            variant="secondary"
            className="leading-6 tracking-tighter font-semibold"
          />
        ))}
      </ShowMore>
    </div>
  )
}

export default NovelTags;
