import { useMutation } from "@tanstack/react-query";
import { postNovelRequest } from "../api/post-novel-request";

export const useSendNovelRequest = () => {
  return useMutation({
    mutationFn: (novelTitle: string) => postNovelRequest(novelTitle),
    onError: (error) => {
      console.error(`[useSendNovelRequest] - Error when trying to send novel request.': ${error}`);
    },
  })
}