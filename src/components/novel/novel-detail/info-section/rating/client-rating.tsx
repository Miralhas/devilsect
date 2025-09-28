'use client'

import { Button } from "@/components/ui/button";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import { useAddNovelRating } from "@/service/novels/mutations/use-add-novel-rating";
import { useGetNovelMetrics } from "@/service/novels/queries/use-get-novel-metrics";
import { User } from "@/types/authentication";
import { Novel } from "@/types/novel";
import Rating from '@mui/material/Rating';
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CurrentUserRating from "./current-user-rating";
import RatingLabel from "./rating-label";

const ClientRating = ({ novel, user }: { novel: Novel, user?: User }) => {
  const query = useGetNovelMetrics(novel);
  const [rating, setRating] = useState(query.data.ratingValue ?? 0);
  const [userClicked, setUserClicked] = useState(false);
  const mutation = useAddNovelRating();
  const isAuthenticated = user !== undefined;
  const { handleOpen } = useGlobalLoginContext();

  useEffect(() => {
    if (!userClicked) return;
    const id = setTimeout(() => {
      setUserClicked(false);
      setRating(query.data.ratingValue ?? 0);
    }, 10000);

    return () => clearTimeout(id);
  }, [userClicked, query.data.ratingValue])

  if (!isAuthenticated) {
    return (
      <div className="flex gap-1 items-center ">
        <Rating
          value={rating}
          precision={0.5}
          max={5}
          onChange={handleOpen}
          slotProps={{ icon: { className: "text-[#D3AF37]" } }}
          sx={{ fontSize: "1.65rem" }}
        />
        <RatingLabel size={query.data.ratingSize} value={query.data.ratingValue ?? 0} />
      </div>
    )
  }

  const handleRating = (val: number) => {
    setRating(val);
    setUserClicked(true);
  }

  const handleMutation = () => {
    mutation.mutate({ novel, ratingValue: rating }, {
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
      <CurrentUserRating novelId={novel.id} />
    </div>
  )
}

export default ClientRating;
