import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { BugIcon } from "lucide-react";

import { Dispatch, SetStateAction } from "react";
import ChapterErrorForm from "./chapter-error-form";

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const ChapterErrorDrawer = ({ open, onOpenChange }: Props) => {
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="pure" size="none">
            <BugIcon className="size-4.5 xs:size-5 md:size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-4 space-y-2.5">
          <div className="overflow-y-auto">
            <DrawerHeader className="text-center gap-y-0">
              <DrawerTitle>Specify your problem</DrawerTitle>
              <DrawerDescription className="text-xs">Bug fixes are regularly reviewed by our team.</DrawerDescription>
            </DrawerHeader>
            <ChapterErrorForm handleClose={() => onOpenChange(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChapterErrorDrawer;
