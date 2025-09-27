import { userKeys } from "@/service/user/queries/query-keys";
import { Novel } from "@/types/novel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNovelRating } from "../api/post-novel-rating";
import { novelKeys } from "../queries/query-keys";

export const useAddNovelRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { novel: Novel; ratingValue: number }) => postNovelRating(params),
    onError: (error) => {
      console.log(`[useAddUserRatingOnNovel] - Error when trying to add rating to novel.': ${error}`);
    },
    onSuccess: (_, { novel }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.userRatingOnNovel(novel.id) });
      queryClient.invalidateQueries({ queryKey: novelKeys.getNovelMetrics(novel.id) })
    }
  })
}