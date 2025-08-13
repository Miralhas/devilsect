import InfoSection from "@/components/novel/info-section";
import { putView } from "@/services/novels/api";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

const NovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  putView(slug);


  return (
    <section className="min-h-screen">
      <InfoSection slug={slug} />
      
    </section>
  )
}

export default NovelPage;
