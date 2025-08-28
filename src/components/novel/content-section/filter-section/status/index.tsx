import { Label } from "@/components/ui/label";
import { NovelSearchParams, nuqsNovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";
import { AlignJustify, CheckCheck, CircleCheck, LoaderCircle, LucideIcon } from "lucide-react";
import StatusButton from "./status-button";
import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";

export type Statuses = {
  value: NovelSearchParams["status"];
  icon: LucideIcon;
}

const Status = () => {
  const [values, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const onClear = () => {
    setValues({ status: "" });
  }

  const isDefaultSelected = values.status === "";

  return (
    <div className="bg-secondary/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors space-y-3">
      <div className="flex items-center justify-between">
        <Label className="inline-flex items-start">
          <CircleCheck className="size-4 text-red-700" strokeWidth={3} />
          Status
        </Label>
        {!isDefaultSelected ? <Button variant="link" size="none" className="text-sm text-accent" onClick={onClear}>Clear</Button> : null}
      </div>
      <div className="grid grid-cols-1 grid-rows-3 gap-2.5">
        <StatusButton value={""} icon={AlignJustify}>All</StatusButton>
        <StatusButton value={"COMPLETED"} icon={CheckCheck}>Completed</StatusButton>
        <StatusButton value={"ON_GOING"} icon={LoaderCircle}>Ongoing</StatusButton>
      </div>
    </div>
  )
}

export default Status;
