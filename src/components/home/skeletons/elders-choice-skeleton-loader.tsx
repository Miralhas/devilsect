import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap } from "lucide-react";

const EldersChoiceSkeletonLoader = () => {
  return (
    <section className="w-full space-y-4">
      <SectionHeader icon={GraduationCap} title="Elder's Choice" />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4" id="elders-choice-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="w-full relative aspect-[2/3]" key={i}>
            <Skeleton className="h-full w-full col-span-1" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default EldersChoiceSkeletonLoader;
