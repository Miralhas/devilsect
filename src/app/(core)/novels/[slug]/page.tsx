import AboutSection from "@/components/novel/about-section";
import InfoSection from "@/components/novel/info-section";
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
    <section className="min-h-[200vh]">
      <InfoSection novel={novel} />
      <AboutSection novel={novel} />
    </section>
  )
}

export default NovelPage;
