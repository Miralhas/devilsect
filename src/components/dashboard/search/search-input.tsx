'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = ({ handleValue, value }: { handleValue: (val: string) => void; value: string }) => {
  const [text, setText] = useState<string>(value);

  const handleSearch = useDebouncedCallback((val: string) => {
    handleValue(val);
    if (!val) {
      handleValue("");
    }
  }, 300);

  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    handleSearch(event.target.value);
  }

  const handleClear = () => {
    handleValue("");
    setText("");
  }

  return (
    <div className="relative">
      <SearchIcon className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
      <Input
        type="text"
        value={text}
        onChange={handleType}
        placeholder="Search for books by title"
        className="w-full p-3 pl-11 placeholder:text-muted-foreground focus:text-sm placeholder:text-sm border-zinc-50/10"
        autoFocus
      />
      {value ? (
        <Button variant="pure" size="icon" className="absolute rounded-full right-1 top-0 text-muted-foreground hover:text-inherit transition-colors ease-in-out duration-200 cursor-pointer" onClick={handleClear} >
          <XIcon className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}

export default SearchInput;
