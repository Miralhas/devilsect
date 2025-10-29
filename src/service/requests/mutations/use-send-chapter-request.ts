import { useMutation } from "@tanstack/react-query";
import { postChapterRequest } from "../api/post-chapter-request";

export const useSendChapterRequest = () => {
  return useMutation({
    mutationFn: (novelSlug: string) => postChapterRequest(novelSlug),
    onError: (error) => {
      console.error(`[useSendChapterRequest] - Error when trying to send chapter request.': ${error}`);
    },
  })
}