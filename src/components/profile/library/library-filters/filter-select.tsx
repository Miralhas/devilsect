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


const FilterSelect = () => {
  const [, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);

  return (
    <Select
      onValueChange={(value) => setSearchParams({ filter: value })}
    >
      <SelectTrigger className="text-sm">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by</SelectLabel>
          <SelectItem value="bookmarked">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterSelect;
