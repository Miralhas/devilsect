
import { Button } from "@/components/ui/button";
import { NovelSearchParams, nuqsNovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";
import { cn } from "@/lib/utils";
import { useQueryStates } from "nuqs";
import { Statuses } from ".";
import { PropsWithChildren } from "react";

const StatusButton = (props: PropsWithChildren<Statuses>) => {
  const [values, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const onSortClick = (val: NovelSearchParams["status"]) => {
    setValues({ status: val })
  }

  const isCurrent = values.status === props.value;

  return (
    <Button
      variant={isCurrent ? "extra-cool" : "extra-cool-secondary"}
      value="Newest"
      onClick={() => onSortClick(props.value)}
      className="capitalize"
    >
      <props.icon className={cn("size-5 mr-2", isCurrent && "text-red-700")} strokeWidth={2} />
      {props.children}
    </Button>
  )
}

export default StatusButton;
