'use client'

import { Input } from "@/components/ui/input"
import { nuqsSearchParams } from "@/lib/schemas/search-params-schema";
import { SearchIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = () => {
  const [value, setValue] = useQueryStates(nuqsSearchParams);

  const handleSearch = useDebouncedCallback((val: string) => {
    console.log(val)
    setValue({ q: val });
  }, 300);

  return (
    <div className="relative">
      <SearchIcon className="absolute top-5.25 left-3 size-6.5 text-muted-foreground" />
      <Input
        type="text"
        defaultValue={value.q}
        onChange={(val) => handleSearch(val.target.value)}
        placeholder="Search for books by title"
        className="w-full p-8 pl-11 !text-lg placeholder:text-muted-foreground focus:text-lg placeholder:text-lg"
        autoFocus
      />
    </div>
  )
}

export default SearchInput;
