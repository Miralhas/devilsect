'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";

const EditItemButton = ({ display }: { display: "MOBILE" | "DESKTOP" }) => {
  const displayMobile = display === "MOBILE";

  return (
    <Button
      size="sm"
      variant='pure'
      className={cn("gap-1", { "flex-col gap-0": !displayMobile })}
    >
      <SquarePen className="size-5" />
      <span className={cn("text-xs", { "text-[11px]": displayMobile })}>Edit</span>
    </Button>
  )
}

export default EditItemButton;
