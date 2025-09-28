import { Button } from "@/components/ui/button";
import { NovelSearchParams, nuqsNovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";
import { cn } from "@/utils/common-utils";
import { LucideIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

type Props = {
  value: NovelSearchParams["chaptersRange"];
  title: string;
  icon: LucideIcon;
  className?: string;
}

const ChaptersRange = (props: Props) => {
  const { title, value, className } = props;
  const [values, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const onClick = () => {
    setValues({ chaptersRange: value });
  }

  const isSelected = value === values.chaptersRange;

  return (
    <Button
      variant={isSelected ? "extra-cool" : "extra-cool-secondary"}
      size="extra-cool"
      className={cn("justify-start", className)}
      onClick={onClick}
    >
      <props.icon className="size-5" />
      <span>{title}</span>
    </Button>
  )
}

export default ChaptersRange;
