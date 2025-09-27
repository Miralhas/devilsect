import PageHeader from "@/components/page-header";
import TagNovels from "@/components/tags/tag-novels";
import { getTagByName } from "@/service/info/api/get-tag-by-name";
import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { TagsIcon } from "lucide-react";
import { Metadata } from "next";

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = decodeURIComponent((await params).name);
  const tag = await getTagByName(tagName);

  return {
    title: `Tag - ${tag.name}`,
    description: `Discover the best ${tag?.name} novels. Explore top stories, authors, and collections in ${tag?.name} for every kind of reader.`,
  }
}

const TagPage = async ({ params }: Props) => {
  const tagName = decodeURIComponent((await params).name);
  const tag = await getTagByName(tagName);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(novelSummariesQueryOptions({
    enabled: true,
    params: {
      ...novelSummariesInitialParams,
      tags: tag.name,
      size: 18,
    }
  }));

  return (
    <>
      <PageHeader
        icon={TagsIcon}
        title={tag.name}
        description={tag.description ?? ""}
        descriptionClassName="text-sm md:text-base"
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TagNovels tag={tag} />
      </HydrationBoundary>
    </>
  )
}

export default TagPage;
