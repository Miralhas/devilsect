import { Novel } from "@/types/novel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddUserRatingOnNovel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ novel, ratingValue }: { novel: Novel; userId: number, ratingValue: number }) => {
      const res = await fetch(`/api/novel/ratings/${novel.slug}`, {
        method: 'POST',
        body: JSON.stringify({ ratingValue })
      });
      if (!res.ok) throw new Error("Failed to post novel rating")
    },
    onError: (error) => {
      console.log(`[useAddUserRatingOnNovel] - Error when trying to add rating to novel.': ${error}`);
    },
    onSettled: (_, __, { novel, userId }) => {
      queryClient.invalidateQueries({ queryKey: ["rating", { novelId: novel.id, userId }] });
      queryClient.invalidateQueries({ queryKey: ["novel", "detail", "ratings", novel.id] })
    }
  })
}