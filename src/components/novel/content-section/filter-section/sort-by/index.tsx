'use client'

import { Label } from "@/components/ui/label";
import { NovelSearchParams, nuqsNovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";
import { CalendarIcon, EyeIcon, FlameIcon, LucideIcon, SlidersVertical, StarIcon } from "lucide-react";
import SortBtn from "./sort-button";
import { Button } from "@/components/ui/button";
import { useQueryStates } from "nuqs";

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
  const [values, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const onClear = () => {
    setValues({ sort: "popularity" });
  }

  const isDefaultSelected = values.sort === "popularity";

  return (
    <div className="bg-secondary/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors space-y-3">
      <div className="flex items-center justify-between">
        <Label className="inline-flex items-start">
          <SlidersVertical className="size-4 text-red-700" strokeWidth={3} />
          Sort By
        </Label>
        {!isDefaultSelected ? <Button variant="link" size="none" className="text-sm text-accent" onClick={onClear}>Clear</Button> : null}
      </div>
      <div className="grid gap-2.5">
        {SORTS.map(s => (
          <SortBtn key={s.value} value={s.value} icon={s.icon} />
        ))}
      </div>
    </div>
  )
}

export default SortBy;
