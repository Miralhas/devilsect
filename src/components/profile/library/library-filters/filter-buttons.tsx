import { Button } from "@/components/ui/button";
import { nuqsUserLibrarySeachParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { useQueryStates } from "nuqs";

const FilterButtons = () => {
  const [searchParams, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);
  const isCompleted = searchParams.filter === "completed";

  return (
    <div className="grid grid-cols-2 w-full md:w-max gap-2">
      <Button
        className="text-xs w-full md:text-sm rounded-xs"
        variant={!isCompleted ? "cool" : "cool-secondary"}
        onClick={() => setSearchParams({ filter: "bookmarked" })}
      >
        All
      </Button>
      <Button
        className="text-xs w-full md:text-sm rounded-xs"
        variant={isCompleted ? "cool" : "cool-secondary"}
        onClick={() => setSearchParams({ filter: "completed" })}
      >
        Completed
      </Button>
    </div>
  )
}

export default FilterButtons;
