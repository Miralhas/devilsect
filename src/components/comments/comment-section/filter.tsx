import { Button } from "@/components/ui/button";
import { useCommentsContext } from "@/contexts/comments-context";
import { SortKey } from "@/lib/schemas/comment-params-schema";

const Filter = () => {
  const {sort, handleSort} = useCommentsContext();
  return (
    <div className="grid md:w-max grid-cols-3 ms-auto">
      <Button className="rounded-none"
        size="sm"
        variant={sort === SortKey.NEWEST ? "cool" : "cool-secondary"}
        onClick={() => handleSort(SortKey.NEWEST)}
      >
        Newest
      </Button>
      <Button className="rounded-none"
        size="sm"
        variant={sort === SortKey.TOP ? "cool" : "cool-secondary"}
        onClick={() => handleSort(SortKey.TOP)}
      >
        Top
      </Button>
      <Button className="rounded-none"
        size="sm"
        variant={sort === SortKey.OLDEST ? "cool" : "cool-secondary"}
        onClick={() => handleSort(SortKey.OLDEST)}
      >
        Oldest
      </Button>
    </div>
  )
}

export default Filter;
