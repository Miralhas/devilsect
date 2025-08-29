const GridHeader = () => {
  return (
    <div className="hidden md:grid md:grid-cols-[50px_0.3fr_0.5fr_0.2fr_0.1fr] gap-1 pb-3 mb-4 border-b border-zinc-200/20 dark:border-zinc-700/30">
      <div className="col-span-1">
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1">
        Title
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1">
        Chapter
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1">
        Author
      </div>
      <div className="text-xs font-medium uppercase tracking-wide col-span-1 justify-self-end pe-3">
        Updated
      </div>
    </div>
  )
}

export default GridHeader;
