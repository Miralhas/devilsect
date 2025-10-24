export const postChapterRequest = async (novelSlug: string) => {
  const res = await fetch(`/api/requests/${novelSlug}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error("Failed to post chapter request for novel with slug: " + novelSlug);
}