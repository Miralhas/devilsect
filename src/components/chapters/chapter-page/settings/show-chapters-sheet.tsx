import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Chapter } from "@/types/chapter";
import { Menu } from "lucide-react";

const ShowChaptersSheet = ({ chapter }: { chapter: Chapter }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex gap-3 items-center cursor-pointer">
            <Menu className="text-muted-foreground size-6" />
            <p className="text-sm md:text-[15px] font-semibold tracking-tight leading-7 text-white line-clamp-1 w-full max-w-[100px] xs:max-w-[190px] md:max-w-[300px]">
              {chapter.title}
            </p>
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
            </div>
            <div className="grid gap-3">
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ShowChaptersSheet;
