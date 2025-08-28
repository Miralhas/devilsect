'use client'

import { Label } from "@/components/ui/label";
import { NovelSearchParams } from "@/lib/schemas/novel-summaries-params-schema";
import { CalendarIcon, EyeIcon, FlameIcon, LucideIcon, SlidersVertical, StarIcon } from "lucide-react";
import SortBtn from "./sort-button";

export type SortButton = {
  value: NovelSearchParams["sort"];
  icon: LucideIcon;
}

const SORTS: SortButton[] = [
  { value: "popularity", icon: FlameIcon },
  { value: "views", icon: EyeIcon },
  { value: "rating", icon: StarIcon },
  { value: "newest", icon: CalendarIcon },
]

const SortBy = () => {
  return (
    <div className="bg-secondary/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors space-y-3">
      <Label className="inline-flex items-start">
        <SlidersVertical className="size-4 text-red-700" strokeWidth={3} />
        Sort By
      </Label>
      <div className="grid gap-2.5">
        {SORTS.map(s => (
          <SortBtn key={s.value} value={s.value} icon={s.icon} />
        ))}
      </div>
    </div>
  )
}

export default SortBy;
