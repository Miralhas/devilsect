import { cn } from "@/lib/utils";

type Opacity = "ultra-low" | "low" | "medium" | "high" | "ultra-high";

type BlurCenterProps = { opacity: Opacity };

const BlurCenter = ({ opacity }: BlurCenterProps) => {
  const [v1, v2] = getOpacityClass(opacity);
  return (
    <>
      <div className="fixed inset-0 opacity-30 -z-10 overflow-hidden pointer-events-none">
        <div className={cn("absolute top-1/3 right-1/4 w-1/2 h-1/2 rounded-full blur-3xl", v1)}></div>
        <div className={cn("absolute bottom-1/4 left-1/3 w-1/2 h-1/2 rounded-full blur-3xl", v2)}></div>
      </div>
    </>
  )
}

const getOpacityClass = (opacity: Opacity): [v1: string, v2: string] => {
  switch (opacity) {
    case "ultra-high":
      return ["bg-primary/50", "bg-primary/40"]
    case "high":
      return ["bg-primary/40", "bg-primary/30"]
    case "medium":
      return ["bg-primary/30", "bg-primary/20"]
    case "low":
      return ["bg-primary/20", "bg-primary/10"]
    case "ultra-low":
    default: return ["bg-primary/10", "bg-primary/5"]
  }
}

export default BlurCenter;
