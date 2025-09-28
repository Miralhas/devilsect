import { CommentInput } from "@/types/threaded-comment";

type Params = {
  commentInput: CommentInput,
  commentId: number,
  novelSlug: string;
};

export const updateNovelReview = async ({ commentInput, commentId, novelSlug }: Params) => {
  const res = await fetch(`/api/comment/${novelSlug}/action/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(commentInput)
  });

  if (!res.ok) {
    throw new Error("Failed to PUT novel review!")
  }
}