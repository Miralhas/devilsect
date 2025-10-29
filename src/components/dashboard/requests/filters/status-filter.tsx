import { Button } from "@/components/ui/button";
import { allowedValues, RequestParams } from "@/lib/schemas/search-params/request-params";
import { Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  current: RequestParams["status"];
  setFilter: Dispatch<SetStateAction<RequestParams["status"]>>;
}

const StatusFilter = ({ current, setFilter }: Props) => {

  return (
    <div className="grid grid-cols-4 gap-2.5">
      <p className="col-span-full font-light text-sm">Status Filter: </p>
      {allowedValues.status.map(f => (
        <Button key={f} variant={current === f ? "cool" : "cool-secondary"} onClick={() => setFilter(f)}>{f}</Button>
      ))}
      {!!current && (
        <Button variant="extra-cool" onClick={() => setFilter(undefined)}>Clear status <Trash2Icon className="size-4" /></Button>
      )}
    </div>
  )
}

export default StatusFilter;
