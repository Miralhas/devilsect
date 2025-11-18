'use client'

import { Button } from "@/components/ui/button";
import { ALPHABET, nuqsTagsParams } from "@/lib/schemas/tags-schema";
import { cn } from "@/utils/common-utils";
import { SearchIcon, XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Input } from "../ui/input";

const TagsFilter = () => {
  const [params, setParams] = useQueryStates(nuqsTagsParams);

  return (
    <>
      <div className="flex gap-6 px-1 md:px-4 overflow-x-auto md:justify-around md:overflow-visible">
        {ALPHABET.map(l => (
          <Button
            key={l}
            size="none"
            variant="pure"
            onClick={() => setParams({ letter: l, page: 0 })}
            className={cn("text-xl uppercase transition-all font-bold duration-200 ease-in-out text-zinc-300/90 hover:text-accent hover:scale-110", params.letter === l && "text-accent scale-110")}
          >
            {l}
          </Button>
        ))}
      </div>
      <div className="relative w-full md:max-w-max md:ml-auto">
        <SearchIcon className="absolute top-2.5 left-2.25 size-4 text-muted-foreground" />
        <Input
          type="text"
          value={params.q}
          onChange={e => setParams({ q: e.target.value })}
          placeholder="Filter tags by name..."
          className="w-full md:max-w-sm placeholder:text-sm placeholder:text-[13px] pl-7"
        />
        {params.q ? (
          <Button variant="pure" size="icon" className="absolute rounded-full right-0.5 top-0 text-muted-foreground hover:text-inherit transition-colors ease-in-out duration-200 cursor-pointer" onClick={() => setParams({ q: "" })} >
            <XIcon className="size-3.5" />
          </Button>
        ) : null}
      </div>
    </>
  )
}

export default TagsFilter;
