import { env } from "@/env";
import { getSession } from "@/lib/sessions";

export const putView = async (novelSlug: string): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/metrics/${novelSlug}/view`;

  const res = await fetch(url, {
    method: "put",
  });

  if (!res.ok) {
    console.log("failed to post novel view");
  }
}

export const bookmarkNovel = async (novelSlug: string) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/library/bookmark/${novelSlug}`;
  const session = await getSession();
  if (!session) throw new Error("Bookmark failed. Try again later!");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
  });

  if (!res.ok) {
    console.log("error");
    throw new Error("Bookmark failed. Try again later!")
  }
}

export const removeNovelBookmark = async (libraryId: number) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/library/bookmark/${libraryId}`;
  const session = await getSession();
  if (!session) throw new Error("Failed to remove bookmark. Try again later!");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    throw new Error("Failed to remove bookmark. Try again later!")
  }
}