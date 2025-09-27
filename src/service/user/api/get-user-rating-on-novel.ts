import { Rating } from "@/types/rating";

export const getUserRatingOnNovel = async (novelId: number) => {
  const res = await fetch(`/api/user/ratings/${novelId}`)
  if (!res.ok) throw new Error("Failed to fetch user rating on novel");
  return await res.json() as Rating;
}