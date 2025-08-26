'use client'

import { Input } from "@/components/ui/input"
import { nuqsSearchParams } from "@/lib/schemas/search-params-schema";
import { SearchIcon, XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { Button } from "../ui/button";

const SearchInput = () => {
  const [value, setValue] = useQueryStates(nuqsSearchParams);
  const [text, setText] = useState(() => value.q)

  const handleSearch = useDebouncedCallback((val: string) => {
    console.log(val)
    setValue({ q: val });
  }, 300);

  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    handleSearch(event.target.value)
  }

  const handleClear = () => {
    setValue({ q: "" })
    setText("");
  }

  return (
    <div className="relative">
      <SearchIcon className="absolute top-5.25 left-3 size-6.5 text-muted-foreground" />
      <Input
        type="text"
        value={text}
        onChange={handleType}
        placeholder="Search for books by title"
        className="w-full p-8 pl-11 !text-lg placeholder:text-muted-foreground focus:text-lg placeholder:text-lg"
        autoFocus
      />
      {value.q ? (
        <Button variant="pure" size="icon" className="absolute rounded-full right-5 top-4 text-muted-foreground hover:text-inherit transition-colors ease-in-out duration-200 cursor-pointer" onClick={handleClear} >
          <XIcon className="size-5" />
        </Button>
      ) : null}
    </div>
  )
}

export default SearchInput;
