'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nuqsUserLibrarySeachParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { useQueryStates } from 'nuqs';

const SortFilter = () => {
  const [params, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);

  return (
    <Select
      onValueChange={(value) => setSearchParams({ sort: value })}
      value={params.sort}
    >
      <SelectTrigger className="text-xs sm:text-sm w-full">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="Last Read"><span className="text-[11px] text-xs text-muted-foreground">Sort:</span> Last Read</SelectItem>
          <SelectItem value="Longest"><span className="text-[11px] text-xs text-muted-foreground">Sort:</span> Longest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortFilter;
