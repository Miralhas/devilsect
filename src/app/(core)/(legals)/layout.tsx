import BlurCenter from "@/components/ui/blur-center";
import { PropsWithChildren } from "react";

const LegalsLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="mx-auto w-full max-w-[1280px] pt-6 min-h-[calc(100vh-(70px+187px))] space-y-5 p-4 pb-8">
      <BlurCenter opacity="ultra-low" />
      {children}
    </section>
  )
}

export default LegalsLayout;
