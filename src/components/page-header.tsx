import { LucideIcon } from "lucide-react";
import BlurCenter from "./ui/blur-center";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const PageHeader = (props: Props) => {
  return (
    <div className="border border-zinc-50/10 bg-secondary/10 p-7 rounded-lg flex flex-col relative">
      <BlurCenter opacity="medium" className="absolute" />
      <h1 className={cn("inline-flex items-center gap-2 text-3xl md:text-4xl font-bold", props.titleClassName)}>
        <props.icon className="size-9 text-accent shrink-0" strokeWidth={2.5} />
        <span className="tracking-wide bg-gradient-to-r from-red-500/70 via-accent to-primary bg-clip-text text-transparent">
          {props.title}
        </span>
      </h1>
      <p className={cn("text-muted-foreground text-base md:text-lg mt-1", props.descriptionClassName)}>{props.description}</p>
    </div>
  )
}

export default PageHeader;
