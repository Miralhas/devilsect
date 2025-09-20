"use client"

import { Check, ChevronsUpDown, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useGetTags } from "@/services/novels/client-queries"
import Loading from "@/components/loading"
import { Tag } from "@/types/novel"

interface Props {
  tags: string[];
  handleTags: (t: Tag) => void;
  handleRemoveSelectedTag: (tagName: string) => void;
}

export const TagsCombobox = ({ tags, handleTags, handleRemoveSelectedTag }: Props) => {
  const [open, setOpen] = useState(false);

  const query = useGetTags({ size: 2000 });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className="flex text-sm flex-wrap items-center w-full h-auto bg-secondary/30 border border-zinc-50/15 rounded-md py-1.5 px-3 cursor-pointer [&_svg]:size-5 [&_svg]:ms-auto"
        >
          {tags.length > 0 ? (
            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-2">
              {tags.map(v => (
                <div
                  key={v}
                  className="flex items-end gap-2 border border-primary/70 bg-primary/30 rounded-sm px-2 py-1 cursor-default"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="text-xs text-[11px]">
                    {v}
                  </span>
                  <Button className="" variant="pure" size="none" type="button" onClick={() => handleRemoveSelectedTag(v)}>
                    <XIcon className="!size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : <span className="text-zinc-300/80">Select tags</span>}
          <ChevronsUpDown className="opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-(--radix-popover-trigger-width)" side="bottom">
        <Command>
          <CommandInput placeholder="Search tag..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Tags found.</CommandEmpty>
            <CommandGroup className="text-zinc-300">
              {query.isLoading ? (
                <div><Loading /></div>
              ) : (
                <>
                  {query.data?.results.map(tag => {
                    const isSelected = tags.some(v => v === tag.name);
                    return (
                      <CommandItem
                        className={cn(isSelected && "text-red-900")}
                        key={tag.id}
                        value={tag.name}
                        onSelect={() => handleTags(tag)}
                      >
                        {tag.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            isSelected ? "text-red-700 opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )
                  })}
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}



export default TagsCombobox;