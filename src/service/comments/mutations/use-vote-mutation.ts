import { Vote } from "@/types/threaded-comment";
import { useMutation } from "@tanstack/react-query";
import { postVote } from "../api/post-vote";

export const useVoteMutation = (commentId: number) => {
  return useMutation({
    mutationFn: (vote: Vote) => postVote(vote, commentId)
  })
}