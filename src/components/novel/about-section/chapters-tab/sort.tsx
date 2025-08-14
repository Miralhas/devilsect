import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "@/lib/utils";
import { Novel } from "@/types/novel"
import { Dispatch, SetStateAction } from "react";

type SortProps = {
  novel: Novel;
  setSort: Dispatch<SetStateAction<"NEWEST" | "OLDEST">>;
  sort: "NEWEST" | "OLDEST";
}

const Sort = ({ novel, sort, setSort }: SortProps) => {
  return (
    <>
      <div className="w-full grid grid-cols-[1fr_0.25fr] ">
        <div className="col-span-1">
          <p className="text-muted-foreground font-medium text-sm md:text-base">Latest Chapter</p>
          <div className="flex items-center gap-3">
            <p className="text-sm md:text-base font-semibold line-clamp-1">{novel.lastChapter.title}</p>
            <span className="text-muted-foreground text-sm me-4 sr-only md:not-sr-only">{formatDate(novel.lastChapter.createdAt)}</span>
          </div>
        </div>
        <Select value={sort} onValueChange={setSort as Dispatch<SetStateAction<string>>}>
          <SelectTrigger className="w-full max-w-[100px] col-span-1 self-center justify-self-end">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorts</SelectLabel>
              <SelectItem value="NEWEST">Newest</SelectItem>
              <SelectItem value="OLDEST">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default Sort;
