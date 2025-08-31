import { useGetUserRatingOnNovel } from "@/services/novels/client-queries";
import { StarIcon } from "lucide-react";

const CurrentUserRating = ({ novelId, userId }: { novelId: number, userId: number }) => {
  const query = useGetUserRatingOnNovel({ novelId, userId });

  if (query.isLoading || query.isError) return null;

  return (
    <p className="text-muted-foreground text-xs md:text-[13px] font-medium ml-0.75 inline-flex items-center gap-0.5">
      You rated: {query.data?.ratingValue}
      <StarIcon className="size-3 text-muted-foreground" fill="#9f9fa9" />
    </p>
  )
}

export default CurrentUserRating;
