import GenresContainer from "@/components/genres/genres-container";
import PageHeader from "@/components/page-header";
import { getNovelGenres } from "@/services/novels/client-queries";
import { getAllNovelSlugs } from "@/services/novels/server-queries";
import { TagIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genres",
  description: "Explore our collection of genres to easily find novels that match your interests.",
};

const GenresPage = async () => {
  const genresPromise = getNovelGenres();
  const slugsPromise = getAllNovelSlugs();
  const [genres, slugs] = await Promise.all([genresPromise, slugsPromise]);

  return (
    <>
      <PageHeader
        icon={TagIcon}
        description="Explore our collection of genres to easily find novels that match your interests."
        title="Genres"
        descriptionClassName="text-sm md:text-base"
      />
      <GenresContainer genres={genres} slugs={slugs.results} />
    </>
  )
}

export default GenresPage;
