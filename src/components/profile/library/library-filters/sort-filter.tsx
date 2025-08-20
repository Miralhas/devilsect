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
import { nuqsUserLibrarySeachParams } from "@/lib/schemas/user-library-params-schema";
import { useQueryStates } from 'nuqs';

const SortFilter = () => {
  const [, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);

  return (
    <Select
      onValueChange={(value) => setSearchParams({ sort: value })}
    >
      <SelectTrigger className="text-sm md:ml-auto">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="Last Read">Last Read</SelectItem>
          <SelectItem value="Longest">Longest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortFilter;
