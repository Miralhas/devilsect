import { useMutation } from "@tanstack/react-query";
import { postFixChapterRequest } from "../api/post-fix-chapter-request";

export const useSendFixChapterRequest = () => {
  return useMutation({
    mutationFn: postFixChapterRequest,
    onError: (error) => {
      console.error(`[useSendChapterRequest] - Error when trying to send fix chapter request.': ${error}`);
    },
  })
}