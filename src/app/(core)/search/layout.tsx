import PageHeader from "@/components/page-header";
import BlurCenter from "@/components/ui/blur-center";
import { SearchIcon } from "lucide-react";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="grid grid-rows-[min-content_max-content] w-full max-w-[1280px] mx-auto relative p-4 md:pt-12 space-y-10 min-h-screen mb-10">
      <BlurCenter opacity="low" />
      <PageHeader description="Search for your favorite books" icon={SearchIcon} title="Search" />
      {children}
    </section>
  )
}

export default Layout;
