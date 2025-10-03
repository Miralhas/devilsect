import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import BlurCenter from "@/components/ui/blur-center";
import { PropsWithChildren } from "react";

const AuthorsLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="mx-auto w-full max-w-[1280px] pt-6 min-h-screen space-y-5 p-4 pb-8">
      <DynamicBreadcrumb />
      <BlurCenter opacity="ultra-low" />
      {children}
    </section>
  )
}

export default AuthorsLayout;
