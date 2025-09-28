type Params = {
  commentId: number;
  novelSlug: string
}

export const deleteNovelReview = async ({ commentId, novelSlug }: Params) => {
  const res = await fetch(`/api/comment/${novelSlug}/action/${commentId}`, {
    method: "DELETE",
  });
  
  if (!res.ok) {
    throw new Error("Failed to DELETE novel review!")
  }
}