import AboutSection from "@/components/novel/about-section";
import InfoSection from "@/components/novel/info-section";
import RelatedNovels from "@/components/novel/related-novels";
import { putView } from "@/services/novels/api";
import { getNovelBySlug } from "@/services/novels/server-queries";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

const NovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  putView(slug);

  return (
    <section className="min-h-[100vh] pb-10 space-y-6">
      <InfoSection novel={novel} />
      <AboutSection novel={novel} />
      {/* <Reviews /> */}
      <RelatedNovels genre={novel.genres[0]} />
    </section>
  )
}

export default NovelPage;
