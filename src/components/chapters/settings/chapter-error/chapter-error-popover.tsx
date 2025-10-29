'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BugIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ChapterErrorForm from "./chapter-error-form";

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const ChapterErrorPopover = ({ open, onOpenChange }: Props) => {
  return (
    <>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button variant="pure" size="none">
            <BugIcon className="size-4.5 xs:size-5 md:size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-background w-full max-w-md border border-zinc-50/25 space-y-5" sideOffset={22}>
          <div className="text-center">
            <p className="font-semibold text-white">Specify your problem</p>
            <p className="text-xs text-[13px] text-muted-foreground">Bug fixes are regularly reviewed by our team.</p>
          </div>
          <ChapterErrorForm handleClose={() => onOpenChange(false)} />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ChapterErrorPopover;
