import PageHeader from "@/components/page-header";
import TagsContainer from "@/components/tags/tags-container";
import TagsFilter from "@/components/tags/tags-filter";
import { TagsParams } from "@/lib/schemas/tags-schema";
import { getTagsInitialParams, getTagsQueryOptions } from "@/services/novels/client-queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { TagsIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Explore our collection of tags to easily find novels that match your interests.",
};

const TagsPage = async ({ searchParams }: { searchParams: Promise<{ letter?: string }> }) => {
  const { letter } = await searchParams;
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getTagsQueryOptions({
    ...getTagsInitialParams,
    firstLetter: letter as TagsParams["firstLetter"],
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={TagsIcon}
        description="Explore our collection of tags to easily find novels that match your interests."
        title="Tags"
        descriptionClassName="text-sm md:text-base"
      />
      <div className="space-y-12">
        <TagsFilter />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TagsContainer />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default TagsPage;
