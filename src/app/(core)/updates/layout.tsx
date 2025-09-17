import PageHeader from "@/components/page-header";
import { RefreshCwIcon } from "lucide-react";
import { PropsWithChildren } from "react";

const UpdatesLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="min-h-screen w-full max-w-[1280px] mx-auto p-6.5 pt-6 md:pt-10 space-y-8 md:space-y-12">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Recently Updated Chapters</h1>
        <h4 className="text-base text-[15px] text-zinc-400 font-medium tracking-tight text-pretty">Recently updated chapters from ongoing web novels and light novels.</h4>
      </div> */}
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
