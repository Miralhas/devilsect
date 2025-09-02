'use client'

import { Novel } from "@/types/novel";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import RatingLabel from "./rating-label";
import CurrentUserRating from "./current-user-rating";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useAddUserRatingOnNovel } from "@/services/novels/client-mutations";
import { toast } from "sonner";
import { useGetNovelMetrics } from "@/services/novels/client-queries";

const ClientRating = ({ novel, userId }: { novel: Novel, userId: number }) => {
  const query = useGetNovelMetrics(novel);
  const [rating, setRating] = useState(query.data.ratingValue ?? 0);
  const [userClicked, setUserClicked] = useState(false);
  const mutation = useAddUserRatingOnNovel({ novel, userId, ratingValue: rating });

  useEffect(() => {
    if (!userClicked) return;
    const id = setTimeout(() => {
      setUserClicked(false);
      setRating(query.data.ratingValue ?? 0);
    }, 10000);

    return () => clearTimeout(id);
  }, [userClicked, query.data.ratingValue])

  const handleRating = (val: number) => {
    setRating(val);
    setUserClicked(true);
  }

  const handleMutation = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Rating Saved", { position: "top-center", description: "Rating may take a while to update" });
        setUserClicked(false);
      },
      onError: () => {
        toast.error("Rating Failed", { description: "We couldn’t save your rating. Please try again later." })
      }
    });
  }

  return (
    <div className="space-y-0.5">
      <div className="flex gap-1 items-center ">
        <Rating
          value={rating}
          precision={0.5}
          max={5}
          onChange={(_, val) => handleRating(val ?? 0)}
          slotProps={{ icon: { className: "text-[#D3AF37]" } }}
          sx={{ fontSize: "1.65rem" }}
        />
        <RatingLabel size={query.data.ratingSize} value={query.data.ratingValue ?? 0} />
        {userClicked ? (
          <Button variant="pure" size="sm" className="text-xs text-muted-foreground duration-300 underline gap-x-0.25 transition-opacity hover:opacity-70" onClick={handleMutation}>
            Confirm Rating: {rating}
            <StarIcon className="size-3 text-muted-foreground" fill="#9f9fa9" />
          </Button>
        ) : null}
      </div>
      <CurrentUserRating novelId={novel.id} userId={userId} />
    </div>
  )
}

export default ClientRating;
