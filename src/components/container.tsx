import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Container = ({ children, className }: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] grid gap-5 p-4", className)}>
      {children}
    </div>
  )
}

export default Container;
