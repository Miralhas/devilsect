'use client'

import useCrtlKeyDownHandler from "@/hooks/use-ctrl-keydown-handler";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";

const SearchInput = () => {
  const searchRef = useRef<HTMLButtonElement>(null);
  useCrtlKeyDownHandler({ elementRef: searchRef, key: "k" });

  return (
    <Button asChild className="transition-colors ease-in-out duration-200 hover:bg-background text-muted-foreground border bg-background hover:text-accent-foreground/70 cursor-text shadow-xs" ref={searchRef}>
      <Link className="w-full justify-start relative group" href="/search">
        <SearchIcon className="size-4 text-muted-foreground group-hover:text-accent-foreground/70" />
        <span className="text-xs text-[13px] tracking-tight">Search for novels...</span>
        <kbd
          className="cursor-auto absolute right-[0.4rem] top-[4px] hidden select-none items-center gap-1 rounded border border-muted-foreground/30 px-1.5 py-1 font-bold opacity-100 lg:flex bg-zinc-950 text-[11px] not-prose text-muted-foreground group-hover:text-accent-foreground/70"
        >
          CTRL K
        </kbd>
      </Link>
    </Button>
  )
}

export default SearchInput;