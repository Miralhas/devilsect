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
  const [params, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);

  return (
    <Select
      onValueChange={(value) => setSearchParams({ size: Number(value) })}
      value={params.size.toString()}
    >
      <SelectTrigger className="text-sm w-full">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>
          <SelectItem value="5"><span className="text-[11px] text-xs text-muted-foreground">Size:</span> 5</SelectItem>
          <SelectItem value="10"><span className="text-[11px] text-xs text-muted-foreground">Size:</span> 10</SelectItem>
          <SelectItem value="20"><span className="text-[11px] text-xs text-muted-foreground">Size:</span> 20</SelectItem>
          <SelectItem value="50"><span className="text-[11px] text-xs text-muted-foreground">Size:</span> 50</SelectItem>
          <SelectItem value="100"><span className="text-[11px] text-xs text-muted-foreground">Size:</span> 100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SizeFilter;
