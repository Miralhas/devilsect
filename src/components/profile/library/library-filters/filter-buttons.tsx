import { Button } from "@/components/ui/button";
import { nuqsUserLibrarySeachParams } from "@/lib/schemas/user-library-params-schema";
import { useQueryStates } from "nuqs";

const FilterButtons = () => {
  const [searchParams, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);
  const isCompleted = searchParams.filter === "completed";

  return (
    <div className="flex gap-3 md:justify-between">
      <Button
        className="text-xs md:text-sm"
        variant={!isCompleted ? "cool" : "cool-secondary"}
        onClick={() => setSearchParams({ filter: "bookmarked" })}
      >All</Button>
      <Button
        className="text-xs md:text-sm"
        variant={isCompleted ? "cool" : "cool-secondary"}
        onClick={() => setSearchParams({ filter: "completed" })}
      >Completed</Button>
    </div>
  )
}

export default FilterButtons;
