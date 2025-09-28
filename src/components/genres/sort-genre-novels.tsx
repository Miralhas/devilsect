'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NovelSearchParams, nuqsNovelSummariesParams, sortKeyParams } from "@/lib/schemas/novel-summaries-params-schema";
import { cn } from "@/utils/common-utils";
import { capitalize } from "@/utils/string-utils";
import { useQueryStates } from "nuqs";

const SortGenreNovels = ({ className }: { className?: string }) => {
  const [params, setParams] = useQueryStates(nuqsNovelSummariesParams);
  return (
    <Select value={params.sort} onValueChange={(val: NovelSearchParams["sort"]) => setParams({ ...params, sort: val })}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortKeyParams.map((s, index) => (
          <SelectItem key={index} value={s} className="capitalize">{capitalize(s)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortGenreNovels;
