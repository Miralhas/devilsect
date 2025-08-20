import { env } from "@/env";
import { getSession } from "@/lib/sessions";


export const putComplete = async (novelSlug: string) => {
  const url = `${env.APP_URL}/library/complete/${novelSlug}`;
  const session = await getSession();
  if (!session) throw new Error("Failed to mark novel as complete. Try again later!");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
  });

  if (!res.ok) {
    console.log(await res.json())
    throw new Error("Failed to mark novel as complete. Try again later!");
  }
}

export const deleteComplete = async (libraryId: number) => {
  const url = `${env.APP_URL}/library/complete/${libraryId}`;
  const session = await getSession();
  if (!session) throw new Error("Failed to mark novel as Incomplete. Try again later!");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const res = await fetch(url, {
    method: "DELETE",
    headers: myHeaders,
  });

  if (!res.ok) {
    console.log(await res.json())
    throw new Error("Failed to mark novel as Incomplete. Try again later!");
  }
}


export const putBookmark = async (novelSlug: string) => {
  const url = `${env.APP_URL}/library/bookmark/${novelSlug}`;
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

export const deleteBookmark = async (libraryId: number) => {
  const url = `${env.APP_URL}/library/bookmark/${libraryId}`;
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