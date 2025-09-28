'use server'

import { deleteVote } from "../api/delete-vote";

export const deleteVoteAction = async (commentId: number) => {
  try {
    await deleteVote(commentId);
  } catch (err) {
    console.log(err);
  }
}
