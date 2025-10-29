export const postFixChapterRequest = async (
  { chapterSlug, errors, novelSlug }: { novelSlug: string, chapterSlug: string, errors: string[] }
) => {
  const res = await fetch(`/api/requests/${novelSlug}/${chapterSlug}`, {
    method: 'POST',
    body: JSON.stringify({errors}),
  });
  if (!res.ok) throw new Error("Failed to post fix chapter request for chapter with slug: " + novelSlug + " " + chapterSlug);
}