import ShowMore from "./show-more";

const NovelSummary = ({ description }: { description: string }) => {
  return (
    <div className="space-y-3">
      <p className="text-xl md:text-2xl font-semibold">Summary</p>
      <ShowMore maxLines={5} className="space-y-4">
        <div className="text-base space-y-4 text-shadow-none px-1" dangerouslySetInnerHTML={{ __html: description }}></div>
      </ShowMore>
    </div>
  )
}

export default NovelSummary;
