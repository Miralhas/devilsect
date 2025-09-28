'use client'

import { Button } from "@/components/ui/button";
import { SortKey } from "@/lib/schemas/search-params/comment-params-schema";

type Props = {
  onChangeFilter: (sort: SortKey) => void;
  value: SortKey
}

const UserCommentFilters = ({ onChangeFilter, value }: Props) => {

  return (
    <div className="grid md:w-max grid-cols-3">
      <Button className="rounded-none"
        size="sm"
        variant={value === SortKey.NEWEST ? "cool" : "cool-secondary"}
        onClick={() => onChangeFilter(SortKey.NEWEST)}
      >
        Newest
      </Button>
      <Button className="rounded-none"
        size="sm"
        variant={value === SortKey.OLDEST ? "cool" : "cool-secondary"}
        onClick={() => onChangeFilter(SortKey.OLDEST)}
      >
        Oldest
      </Button>
      <Button className="rounded-none"
        size="sm"
        variant={value === SortKey.TOP ? "cool" : "cool-secondary"}
        onClick={() => onChangeFilter(SortKey.TOP)}
      >
        Top
      </Button>
    </div>
  )
}

export default UserCommentFilters;
