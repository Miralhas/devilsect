import ContentSection from "@/components/novel/content-section";
import PageHeader from "@/components/page-header";
import BlurCenter from "@/components/ui/blur-center";
import { Book } from "lucide-react";

const NovelPage = async () => {
  return (
    <section className="grid grid-rows-[min-content_max-content] w-full max-w-[1280px] mx-auto relative p-4 md:pt-12 space-y-10 min-h-screen pb-8">
      <BlurCenter opacity="low" />
      <PageHeader description="Discover new novels and mastepieces" icon={Book} title="Novels" />
      <ContentSection key="content" />
    </section>
  )
}

export default NovelPage;
