import { Button } from "@/components/ui/button";
import { nuqsUserLibrarySeachParams } from "@/lib/schemas/user-library-params-schema";
import { useQueryStates } from "nuqs";

const FilterButtons = () => {
  const [searchParams, setSearchParams] = useQueryStates(nuqsUserLibrarySeachParams);
  const isCompleted = searchParams.completed;

  return (
    <div className="flex gap-3 md:justify-between">
      <Button
        className="text-xs md:text-sm"
        variant={!isCompleted ? "cool" : "cool-secondary"}
        onClick={() => setSearchParams({ completed: false })}
      >All</Button>
      <Button
        className="text-xs md:text-sm"
        variant={isCompleted ? "cool" : "cool-secondary"}
        onClick={() => setSearchParams({ completed: true })}
      >Completed</Button>
    </div>
  )
}

export default FilterButtons;
