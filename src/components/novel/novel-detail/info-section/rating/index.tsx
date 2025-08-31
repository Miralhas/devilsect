import { getShallowUser } from "@/services/authentication/server-queries";
import { Novel } from "@/types/novel";
import Rating from "@mui/material/Rating";
import ClientRating from "./client-rating";
import RatingLabel from "./rating-label";

const NovelRating = async ({ novel }: { novel: Novel }) => {
  const user = await getShallowUser();

  if (user !== undefined) {
    return <ClientRating novel={novel} userId={user.id} />
  }

  const rating = novel.metrics.ratingValue ?? 0;

  return (
    <div className="flex gap-1 items-center ml-1">
      <Rating
        defaultValue={rating}
        precision={0.5}
        max={5}
        slotProps={{ icon: { className: "text-[#D3AF37]" } }}
        sx={{ fontSize: "1.65rem" }}
        readOnly
      />
      <RatingLabel size={novel.metrics.ratingSize} value={rating} />
    </div>
  )
}

export default NovelRating;
