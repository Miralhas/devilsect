import BestRated from "@/components/home/best-rated";
import Completed from "@/components/home/completed";
import EldersChoice from "@/components/home/elders-choice";
import HeroSection from "@/components/home/hero-section";
import MostRead from "@/components/home/most-read";
import NewReleases from "@/components/home/new-releases";
import Ongoing from "@/components/home/ongoing";
import RankingSection from "@/components/home/ranking-section";
import RecentlyAddedChapters from "@/components/home/recently-added-chapters";
import CarouselSkeleton from "@/components/home/skeletons/carousel-skeleton";
import NewReleasesSkeletonLoader from "@/components/home/skeletons/new-releases-skeleton-loader";
import RankingSkeletonLoader from "@/components/home/skeletons/ranking-skeleton-loader";
import RecentlyAddedChapterSkeletonLoader from "@/components/home/skeletons/recently-added-chapters-skeleton-loader";
import Trending from "@/components/home/trending";
import UserHistory from "@/components/home/user-history";
import { BookCheckIcon, EyeIcon, GraduationCapIcon, LoaderIcon, TrendingUpIcon } from "lucide-react";
import { Suspense } from "react";

export const revalidate = 43200; // 12 hours

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-4 w-full p-1 space-y-16">
        <HeroSection />
        <Suspense fallback={<NewReleasesSkeletonLoader />}>
          <NewReleases />
        </Suspense>
        <UserHistory />
        <Suspense fallback={<CarouselSkeleton icon={GraduationCapIcon} title="Elder's Choice" />}>
          <EldersChoice />
        </Suspense>
        <Suspense fallback={<CarouselSkeleton icon={TrendingUpIcon} title="Trending" />}>
          <Trending />
        </Suspense>
        <Suspense fallback={<RankingSkeletonLoader />}>
          <RankingSection />
        </Suspense>
        <Suspense fallback={<CarouselSkeleton icon={LoaderIcon} title="Ongoing Series" />}>
          <Ongoing />
        </Suspense>
        <Suspense fallback={<CarouselSkeleton icon={EyeIcon} title="Most Read" />}>
          <MostRead />
        </Suspense>
        <Suspense fallback={<CarouselSkeleton icon={EyeIcon} title="Best Rated" />}>
          <BestRated />
        </Suspense>
        <Suspense fallback={<CarouselSkeleton icon={BookCheckIcon} title="Completed Series" />}>
          <Completed />
        </Suspense>
        <Suspense fallback={<RecentlyAddedChapterSkeletonLoader />}>
          <RecentlyAddedChapters />
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage;
