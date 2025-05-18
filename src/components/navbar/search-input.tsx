'use client'

import useCrtlKeyDownHandler from "@/hooks/use-ctrl-keydown-handler";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";

const SearchInput = () => {
  const searchRef = useRef<HTMLButtonElement>(null);
  useCrtlKeyDownHandler({ elementRef: searchRef, key: "k" });

  return (
    <>
      <Button asChild className="text-gray-400 border bg-secondary/70 hover:bg-background hover:text-accent-foreground/75 cursor-text shadow-xs" ref={searchRef!}>
        <Link className="w-full justify-start relative group" href="/search">
          <Search className="size-4 text-gray-400 group-hover:text-accent-foreground/75" />
          <span>Search for novels...</span>
          <kbd
            className="cursor-auto absolute right-[0.4rem] top-[4px] hidden select-none items-center gap-1 rounded border border-muted-foreground/30 px-1.5 py-1 font-medium opacity-100 lg:flex bg-zinc-950 text-[11px] not-prose text-muted-foreground/80 group-hover:text-accent-foreground/75"
          >
            CTRL K
          </kbd>
        </Link>
      </Button>
    </>
  )
}

export default SearchInput;