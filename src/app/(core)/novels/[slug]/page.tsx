import AboutSection from "@/components/novel/novel-detail/about-section";
import InfoSection from "@/components/novel/novel-detail/info-section";
import NovelReviews from "@/components/novel/novel-detail/novel-reviews";
import RelatedNovels from "@/components/novel/novel-detail/related-novels";
import SkeletonLoader from "@/components/novel/novel-detail/related-novels/skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { getShallowUser } from "@/services/authentication/server-queries";
import { putView } from "@/services/novels/api";
import { getNovelBySlug } from "@/services/novels/server-queries";
import { Suspense } from "react";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

const NovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  const shallowUser = await getShallowUser();

  putView(slug);

  return (
    <section className="min-h-[100vh] pb-10 space-y-6">
      <InfoSection novel={novel} />
      <AboutSection novel={novel} />
      <Separator orientation="horizontal" className="mb-12" />
      <NovelReviews slug={novel.slug} currentUser={shallowUser} />
      <Suspense fallback={<SkeletonLoader />}>
        <RelatedNovels genre={novel.genres[0]} />
      </Suspense>
    </section>
  )
}

export default NovelPage;
