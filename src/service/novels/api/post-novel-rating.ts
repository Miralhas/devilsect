import { Novel } from "@/types/novel";

export const postNovelRating = async ({ novel, ratingValue }: { novel: Novel; ratingValue: number }) => {
  const res = await fetch(`/api/novel/ratings/${novel.slug}`, {
    method: 'POST',
    body: JSON.stringify({ ratingValue })
  });
  if (!res.ok) throw new Error("Failed to post novel rating");
}