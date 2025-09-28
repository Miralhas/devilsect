import { CommentInput } from "@/types/threaded-comment";

type Params = {
  commentInput: CommentInput;
  commentId: number;
  novelSlug: string;
  chapterSlug: string;
};

export const updateChapterComment = async ({ commentInput, commentId, novelSlug, chapterSlug }: Params) => {
  const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}/action/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(commentInput)
  });
  if (!res.ok) {
    throw new Error("Failed to PUT novel review!")
  }
}