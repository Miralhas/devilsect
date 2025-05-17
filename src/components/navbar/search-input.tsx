import { Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchInput = () => {
  return (
    <>
      <Button className="w-full justify-start text-gray-400 border bg-secondary/70 shadow-xs hover:bg-background hover:text-zinc-200 cursor-text relative group">
        <Search className="size-4 text-gray-400 group-hover:text-zinc-200" />
        <span>Search for novels...</span>
        <kbd
          className="cursor-auto absolute right-[0.4rem] top-[4px] hidden select-none items-center gap-1 rounded border border-muted-foreground/30 px-1.5  py-1 font-medium opacity-100 sm:flex bg-zinc-950 text-[11px] not-prose text-muted-foreground/80 group-hover:text-zinc-200"
        >
          CTRL K
        </kbd>
      </Button>
    </>
  )
}

export default SearchInput;