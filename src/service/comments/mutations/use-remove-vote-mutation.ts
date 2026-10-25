import { useMutation } from "@tanstack/react-query";
import { deleteVote } from "../api/delete-vote";

export const useRemoveVoteMutation = () => {
  return useMutation({
    mutationFn: deleteVote
  })
}