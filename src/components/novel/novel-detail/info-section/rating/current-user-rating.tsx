import { useGetUserRatingOnNovel } from "@/services/novels/client-queries";

const CurrentUserRating = ({ novelId, userId }: { novelId: number, userId: number }) => {
  const query = useGetUserRatingOnNovel({ novelId, userId });

  if (query.isLoading || query.isError) return null;

  return (
    <p className="text-muted-foreground text-xs md:text-[13px] font-medium ml-1.5">You rated: {query.data?.ratingValue}</p>
  )
}

export default CurrentUserRating;
