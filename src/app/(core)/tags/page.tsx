import PageHeader from "@/components/page-header";
import TagsContainer from "@/components/tags/tags-container";
import TagsFilter from "@/components/tags/tags-filter";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { TagsParams } from "@/lib/schemas/tags-schema";
import { getTagsInitialParams, getTagsQueryOptions } from "@/service/info/queries/use-get-tags";
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
    firstLetter: (letter as TagsParams["firstLetter"]) ?? getTagsInitialParams.firstLetter,
  }));

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Tags", "/tags")).replace(/</g, '\\u003c'),
        }}
      />
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
