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

const SizeFilter = () => {
  const [, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);

  return (
    <Select
      onValueChange={(value) => setSearchParams({ size: Number(value) })}>
      <SelectTrigger className="text-sm">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SizeFilter;
