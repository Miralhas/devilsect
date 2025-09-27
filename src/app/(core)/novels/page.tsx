import ContentSection from "@/components/novel/content-section";
import PageHeader from "@/components/page-header";
import BlurCenter from "@/components/ui/blur-center";
import { novelListInitalParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Book } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novels",
  description: "Discover new novels and mastepieces",
};

const NovelsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(novelSummariesQueryOptions({
    enabled: true,
    params: { ...novelListInitalParams }
  }));

  return (
    <section className="grid grid-rows-[min-content_max-content] w-full max-w-[1280px] mx-auto relative p-4 md:pt-12 space-y-10 min-h-screen pb-8">
      <BlurCenter opacity="low" />
      <PageHeader description="Discover new novels and mastepieces" icon={Book} title="Novels" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContentSection key="content" />
      </HydrationBoundary>
    </section>
  )
}

export default NovelsPage;
