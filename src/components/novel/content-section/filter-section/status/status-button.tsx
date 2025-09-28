
import { Button } from "@/components/ui/button";
import { NovelSearchParams, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { cn } from "@/utils/common-utils";
import { useQueryStates } from "nuqs";
import { PropsWithChildren } from "react";
import { Statuses } from ".";

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
      size="extra-cool"
      onClick={() => onSortClick(props.value)}
      className="capitalize justify-start"
    >
      <props.icon className={cn("size-5 mr-2", isCurrent && "text-red-700")} strokeWidth={2} />
      {props.children}
    </Button>
  )
}

export default StatusButton;
