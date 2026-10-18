import PageHeader from "@/components/page-header";
import TagNovels from "@/components/tags/tag-novels";
import { getTagBySlug } from "@/service/info/api/get-tag-by-name";
import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, noop, QueryClient } from "@tanstack/react-query";
import { TagsIcon } from "lucide-react";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  "use cache"
  cacheLife('weeks');

  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  return {
    title: `Tag - ${tag.name}`,
    description: `Discover the best ${tag?.name} novels. Explore top stories, authors, and collections in ${tag?.name} for every kind of reader.`,
  }
}

const TagPage = async ({ params }: Props) => {
  "use cache"
  cacheLife('weeks');

  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  const queryClient = new QueryClient();

  await queryClient.query(novelSummariesQueryOptions({
    enabled: true,
    params: {
      ...novelSummariesInitialParams,
      tags: tag.name,
      size: 18,
    }
  })).catch(noop);

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
