import { Button } from "@/components/ui/button";
import { SortKey } from "@/lib/schemas/comment-params-schema";
import { Dispatch, SetStateAction } from "react";

const Filter = ({ selectedFilter, setSelectedFilter }: { selectedFilter: SortKey; setSelectedFilter: Dispatch<SetStateAction<SortKey>> }) => {
  return (
    <div className="grid w-max grid-cols-3 ms-auto">
      <Button className="rounded-none"
        size="sm"
        variant={selectedFilter === SortKey.NEWEST ? "cool" : "cool-secondary"}
        onClick={() => setSelectedFilter(SortKey.NEWEST)}
      >
        Newest
      </Button>
      <Button className="rounded-none"
        size="sm"
        variant={selectedFilter === SortKey.TOP ? "cool" : "cool-secondary"}
        onClick={() => setSelectedFilter(SortKey.TOP)}
      >
        Top
      </Button>
      <Button className="rounded-none"
        size="sm"
        variant={selectedFilter === SortKey.OLDEST ? "cool" : "cool-secondary"}
        onClick={() => setSelectedFilter(SortKey.OLDEST)}
      >
        Oldest
      </Button>
    </div>
  )
}

export default Filter;
