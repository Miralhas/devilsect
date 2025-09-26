'use client'

import { Button } from "@/components/ui/button";
import { ALPHABET, nuqsTagsParams } from "@/lib/schemas/tags-schema";
import { cn } from "@/lib/utils";
import { useQueryStates } from "nuqs";

const TagsFilter = () => {
  const [params, setParams] = useQueryStates(nuqsTagsParams);
  
  return (
    <div className="flex gap-6 px-1 md:px-4 pb-2 overflow-x-auto md:justify-around md:overflow-visible">
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
  )
}

export default TagsFilter;
