import PageHeader from "@/components/page-header";
import { RefreshCwIcon } from "lucide-react";
import { PropsWithChildren } from "react";

const UpdatesLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="min-h-screen w-full max-w-[1280px] mx-auto p-6.5 pt-6 md:pt-10 space-y-8 md:space-y-12">
      <PageHeader
        title="Recently Updated Chapters"
        description="Recently updated chapters from ongoing web novels and light novels."
        icon={RefreshCwIcon}
        descriptionClassName="md:text-base"
        titleClassName="md:text-3xl"
      />
      {children}
    </section>
  )
}

export default UpdatesLayout;
