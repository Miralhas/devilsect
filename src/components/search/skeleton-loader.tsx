import { cn } from "@/utils/common-utils";
import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = ({ className, size = 12 }: { className?: string; size?: number }) => {
  return (
    <div className={cn("grid grid-cols-3 md:grid-cols-6 gap-4", className)}>
      {Array.from({ length: size }).map((_, index) => (
        <Skeleton key={index} className="h-full w-full relative aspect-[2/3]" />
      ))}
    </div>
  )
}

export default SkeletonLoader;
