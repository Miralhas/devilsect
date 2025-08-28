import ShowMore from "./show-more";

const NovelSummary = ({ description }: { description: string }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p className="text-xl md:text-2xl font-semibold">Summary</p>
        <div className="w-full h-[2px] bg-zinc-50/7 mt-2.5"></div>
      </div>
      <ShowMore maxLines={5} className="space-y-2.5">
        <div className="text-base space-y-4 text-shadow-none px-1" dangerouslySetInnerHTML={{ __html: description }}></div>
      </ShowMore>
    </div>
  )
}

export default NovelSummary;
