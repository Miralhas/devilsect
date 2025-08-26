import { SearchIcon } from "lucide-react";
import BlurCenter from "../ui/blur-center";

const SearchHeader = () => {
  return (
    <div className="border border-zinc-50/10 bg-secondary/10 p-7 rounded-lg flex flex-col relative">
      <BlurCenter opacity="high" />
      <h1 className="inline-flex items-center gap-2 text-3xl md:text-4xl font-bold">
        <SearchIcon className="size-9 text-accent" strokeWidth={3} />
        <span className="tracking-wide bg-gradient-to-r from-red-500/70 via-accent to-primary bg-clip-text text-transparent">
          Search
        </span>
      </h1>
      <p className="text-muted-foreground text-base md:text-lg mt-1">Search for your favorite books</p>
    </div>
  )
}

export default SearchHeader;
