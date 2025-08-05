import EldersChoiceSkeletonLoader from "../skeletons/elders-choice-skeleton-loader";
import NewReleasesSkeletonLoader from "../skeletons/new-releases-skeleton-loader";
import RankingSkeletonLoader from "../skeletons/ranking-skeleton-loader";

const MainSectionSkeletonLoaders = () => {
  return (
    <>
      <NewReleasesSkeletonLoader />
      <RankingSkeletonLoader />
      <EldersChoiceSkeletonLoader />
    </>
  )
}

export default MainSectionSkeletonLoaders;
