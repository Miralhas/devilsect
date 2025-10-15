import GenreNovels from "@/components/genres/genre-novels";
import PageHeader from "@/components/page-header";
import { generateGenreJsonLDSchema } from "@/lib/json-ld/genre-schema";
import { getGenreByName } from "@/service/info/api/get-genre-by-name";
import { getGenres } from "@/service/info/api/get-genres";
import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { TagIcon } from "lucide-react";
import { Metadata } from "next";

type Props = { params: Promise<{ name: string }> };

export async function generateStaticParams() {
  const genres = await getGenres();
  return genres.map(r => ({ name: r.name.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const genreName = decodeURIComponent((await params).name);
  const genre = await getGenreByName(genreName);

  return {
    title: `Genre - ${genre.name}`,
    description: `Discover the best ${genre?.name} novels. Explore top stories, authors, and collections in ${genre?.name} for every kind of reader.`,
  }
}

const GenrePage = async ({ params }: Props) => {
  const genreName = decodeURIComponent((await params).name);
  const genre = await getGenreByName(genreName);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(novelSummariesQueryOptions({
    enabled: true,
    params: {
      ...novelSummariesInitialParams,
      genres: genre.name,
      size: 18,
    }
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateGenreJsonLDSchema(genre)).replace(/</g, '\\u003c'),
        }}
      />
      <PageHeader
        icon={TagIcon}
        title={genre.name}
        description={genre.description}
        descriptionClassName="text-sm md:text-base"
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GenreNovels genre={genre} />
      </HydrationBoundary>
    </>
  )
}

export default GenrePage;
