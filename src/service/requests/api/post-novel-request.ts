export const postNovelRequest = async (novelTitle: string) => {
  const res = await fetch(`/api/requests`, {
    method: 'POST',
    body: JSON.stringify({ novelTitle })
  });
  if (!res.ok) throw new Error("Failed to post novel request");
}