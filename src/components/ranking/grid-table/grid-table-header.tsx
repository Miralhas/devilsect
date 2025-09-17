const GridTableHeader = () => {
  return (
    <div className="hidden md:grid md:grid-cols-[minmax(0,70px)_minmax(0,70px)_minmax(0,1fr)_minmax(0,0.4fr)_minmax(0,0.5fr)_minmax(0,0.4fr)_minmax(0,0.5fr)_minmax(0,0.5fr)_minmax(0,0.5fr)] gap-4 pb-3  border-b border-zinc-200/20 dark:border-zinc-700/30">
      <div className="text-xs font-medium uppercase tracking-wide col-span-1 ms-5">
        Rank
      </div>
      <div className="col-span-1">

      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1">
        Title
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1 ms-2">
        Views
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1">
        Published
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1 ml-1.5 lg:ml-0">
        Rating
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1">
        Chapters
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1 ms-1.5 lg:ms-3 ">
        Status
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1 ms-1 lg:ms-4">
        Score
      </div>
    </div>
  )
}

export default GridTableHeader;
