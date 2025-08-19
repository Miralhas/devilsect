'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Library } from "@/types/library";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import CompleteActionButton from "./complete-action-button";
import RemoveBookmarkButton from "../../remove-bookmark-button";

const EditItemDialog = ({ display, item }: { display: "MOBILE" | "DESKTOP", item: Library; }) => {
  const displayMobile = display === "MOBILE";
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant='pure'
          className={cn("gap-1", { "flex-col gap-0": !displayMobile })}
        >
          <SquarePen className="size-5" />
          <span className={cn("text-xs sr-only xs:not-sr-only", { "text-[11px]": displayMobile })}>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-3">
          <DialogTitle className="capitalize">Manage {item.novelTitle}</DialogTitle>
          <DialogDescription>
            Mark this novel as complete or remove it from your library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full p-6 gap-4">
          <RemoveBookmarkButton setOpen={setOpen} item={item} />
          <CompleteActionButton setOpen={setOpen} item={item} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditItemDialog;
