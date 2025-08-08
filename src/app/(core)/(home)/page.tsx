import EldersChoice from "@/components/home/elders-choice";
import HeroSection from "@/components/home/hero-section";
import NewReleases from "@/components/home/new-releases";
import MainSectionSkeletonLoaders from "@/components/home/new-releases/main-section-skeleton-loaders";
import RankingSection from "@/components/home/ranking-section";
import RecentlyAddedChapters from "@/components/home/recently-added-chapters";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="min-h-[100vh]">
      <div className="mt-4 w-full p-1 space-y-16">
        <HeroSection />
        <Suspense fallback={<MainSectionSkeletonLoaders />}>
          <NewReleases />
          <EldersChoice />
          <RankingSection />
          <RecentlyAddedChapters />
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage;
