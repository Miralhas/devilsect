import { CommentInput } from "@/types/threaded-comment";

type Params = {
  novelSlug: string;
  chapterSlug: string;
  commentInput: CommentInput;
};

export const postChapterComment = async ({ novelSlug, chapterSlug, commentInput }: Params) => {
  const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}`, {
    method: "POST",
    body: JSON.stringify(commentInput)
  });
  
  if (!res.ok) {
    throw new Error("Failed to POST chapter comment!");
  }
}