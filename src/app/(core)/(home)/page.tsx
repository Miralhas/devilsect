import EldersChoice from "@/components/home/elders-choice";
import HeroSection from "@/components/home/hero-section";
import NewReleases from "@/components/home/new-releases";
import RankingSection from "@/components/home/ranking-section";
import RecentlyAddedChapters from "@/components/home/recently-added-chapters";
import EldersChoiceSkeletonLoader from "@/components/home/skeletons/elders-choice-skeleton-loader";
import NewReleasesSkeletonLoader from "@/components/home/skeletons/new-releases-skeleton-loader";
import RankingSkeletonLoader from "@/components/home/skeletons/ranking-skeleton-loader";
import RecentlyAddedChapterSkeletonLoader from "@/components/home/skeletons/recently-added-chapters-skeleton-loader";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="min-h-[100vh]">
      <div className="mt-4 w-full p-1 space-y-16">
        <HeroSection />
        <Suspense fallback={<NewReleasesSkeletonLoader />}>
          <NewReleases />
        </Suspense>
        <Suspense fallback={<EldersChoiceSkeletonLoader />}>
          <EldersChoice />
        </Suspense>
        <Suspense fallback={<RankingSkeletonLoader />}>
          <RankingSection />
        </Suspense>
        <Suspense fallback={<RecentlyAddedChapterSkeletonLoader />}>
          <RecentlyAddedChapters />
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage;
