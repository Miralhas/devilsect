import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NovelBadgeProps = {
  name: string;
  variant?: "secondary" | "default";
  className?: string;
  href?: string;
}

const NovelBadge = ({ name, className, href = "/", variant = "default" }: NovelBadgeProps) => {
  return (
    <Badge asChild variant={variant} className={cn("rounded-sm md:text-[13.2px] tracking-tight leading-5", className)}>
      <Link href={href}>{name}</Link>
    </Badge>
  )
}

export default NovelBadge;
