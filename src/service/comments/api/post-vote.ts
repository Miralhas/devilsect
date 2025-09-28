import { Vote } from "@/types/threaded-comment";

export const postVote = async (vote: Vote, commentId: number) => {
  const res = await fetch(`/api/comment/vote/${commentId}`, {
    method: "POST",
    body: JSON.stringify(vote)
  });
  
  if (!res.ok) {
    throw new Error("Failed to PUT novel review!")
  }
}