'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nuqsAuthorsParams, sortKeyParams } from "@/lib/schemas/search-params/author-params-schema";
import { capitalize } from "@/utils/string-utils";
import { SearchIcon, XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AuthorsFilter = () => {
  const [params, setParams] = useQueryStates(nuqsAuthorsParams);
  return (
    <div className="w-full space-y-4 md:flex items-center md:justify-between">
      <div className="relative w-full md:max-w-max">
        <SearchIcon className="absolute top-2.5 left-2.25 size-4 text-muted-foreground" />
        <Input
          type="text"
          value={params.q}
          onChange={e => setParams({ q: e.target.value })}
          placeholder="Filter authors by name..."
          className="w-full md:max-w-sm placeholder:text-sm placeholder:text-[13px] pl-7"
        />
        {params.q ? (
          <Button variant="pure" size="icon" className="absolute rounded-full right-0.5 top-0 text-muted-foreground hover:text-inherit transition-colors ease-in-out duration-200 cursor-pointer" onClick={() => setParams({ q: "" })} >
            <XIcon className="size-3.5" />
          </Button>
        ) : null}
      </div>
      <div className="w-full md:max-w-[200px] space-y-1">
        <Select onValueChange={(key: typeof sortKeyParams[number]) => setParams({ ...params, sort: key })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortKeyParams.map((key) => (
              <SelectItem value={key} key={key}>{capitalize(key)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default AuthorsFilter;
