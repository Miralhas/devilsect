import { getNovelBySlug } from "@/service/novels/api/get-novel-by-slug";
import { capitalize, getNovelDescription } from "@/utils/string-utils";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import NovelPage from "../page";

export async function generateMetadata({ params }: PageProps<"/novels/[slug]">): Promise<Metadata> {
  "use cache"
  cacheLife('days');

  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  return {
    title: capitalize(novel.title),
    description: getNovelDescription(novel),
  }
}

export default async function DownloadPage(props: PageProps<"/novels/[slug]">) {
  return <NovelPage {...props} download />;
}