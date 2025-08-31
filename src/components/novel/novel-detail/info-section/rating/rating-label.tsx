import { cn } from "@/lib/utils";

const RatingLabel = ({ value, className, size }: { size: number; value: number, className?: string }) => {
  return (
    <div className={cn("flex gap-1 items-center", className)}>
      <span className="font-semibold">{value}</span>
      <p className="ml-1 text-sm text-muted-foreground">({size} <span className="relative">ratings</span>)</p>
    </div>
  )
}

export default RatingLabel;
