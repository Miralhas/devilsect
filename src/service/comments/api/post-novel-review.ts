import { CommentInput } from "@/types/threaded-comment";

export const postNovelReview = async ({ commentInput, novelSlug }: { commentInput: CommentInput; novelSlug: string }) => {
  const res = await fetch(`/api/comment/${novelSlug}`, {
    method: "POST",
    body: JSON.stringify(commentInput)
  });

  if (!res.ok) {
    throw new Error("Failed to POST novel review!")
  }
}