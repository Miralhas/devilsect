import { Label } from "@/components/ui/label";
import { ArrowUp01, ChevronRight, ChevronsRightLeft, GripIcon } from "lucide-react";
import ChaptersRange from "./chapters-range-button";

const ChaptersCount = () => {
  return (
    <div className="bg-secondary/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors space-y-3 overflow-y-auto max-h-[254px] custom-scrollbar">
      <Label className="inline-flex items-start">
        <ArrowUp01 className="size-4 text-red-700" strokeWidth={3} />
        Chapters
      </Label>
      <div className="grid gap-2.5">
        <ChaptersRange icon={GripIcon} className="text-sm" title={"All"} value="" />
        <ChaptersRange icon={ChevronsRightLeft} className="text-sm" title={"1 - 500 Chapters"} value="1:500" />
        <ChaptersRange icon={ChevronsRightLeft} className="text-sm" title={"500 - 1000 Chapters"} value="500:1000" />
        <ChaptersRange icon={ChevronsRightLeft} className="text-sm" title={"1000 - 2000 Chapters"} value="1000:2000" />
        <ChaptersRange icon={ChevronsRightLeft} className="text-sm" title={"2000 - 3000 Chapters"} value="2000:3000" />
        <ChaptersRange icon={ChevronRight} className="text-sm" title={"3000 Chapters"} value="3000:100000" />
      </div>
    </div>
  )
}

export default ChaptersCount;
