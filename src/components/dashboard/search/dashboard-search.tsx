'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCrtlKeyDownHandler from "@/hooks/use-ctrl-keydown-handler";
import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import NovelList from "./novel-list";
import SearchInput from "./search-input";

const DashboardSearch = () => {
  const searchRef = useRef<HTMLButtonElement>(null);
  useCrtlKeyDownHandler({ elementRef: searchRef, key: "k" });
  const [value, setValue] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild className="max-w-lg">
        <Button asChild className="transition-colors ease-in-out duration-200 hover:bg-background text-muted-foreground border border-zinc-50/20 bg-background hover:text-accent-foreground/70 cursor-text shadow-xs" ref={searchRef}>
          <div className="w-full justify-start relative group">
            <SearchIcon className="size-4 text-muted-foreground group-hover:text-accent-foreground/70" />
            <span className="text-xs text-[13px] tracking-tight">Search for novels...</span>
            <kbd
              className="cursor-auto absolute right-[0.4rem] top-[4px] hidden select-none items-center gap-1 rounded border border-muted-foreground/30 px-1.5 py-1 font-bold opacity-100 lg:flex bg-zinc-950 text-[11px] not-prose text-muted-foreground group-hover:text-accent-foreground/70"
            >
              CTRL K
            </kbd>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[400px] pt-11 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Novel Search</DialogTitle>
          <DialogDescription>
            Search for novels by title
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <SearchInput value={value} handleValue={(val) => setValue(val)} />
          <div className="space-y-3.5">
            <NovelList title={value} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DashboardSearch;
