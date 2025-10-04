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
import { useQueryStates } from "nuqs";

const AuthorsFilter = () => {
  const [params, setParams] = useQueryStates(nuqsAuthorsParams);
  return (
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
  )
}

export default AuthorsFilter;
