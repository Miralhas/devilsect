type Params = {
  commentId: number;
  novelSlug: string;
  chapterSlug: string;
};

export const deleteChapterComment = async ({ commentId, novelSlug, chapterSlug }: Params) => {
  const res = await fetch(`/api/comment/${novelSlug}/${chapterSlug}/action/${commentId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to DELETE novel review!")
  }
}