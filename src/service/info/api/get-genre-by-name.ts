import { env } from "@/env";
import { Genre } from "@/types/novel";
import { redirect } from "next/navigation";

export const getGenreByName = async (name: string): Promise<Genre> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/genres/${name}`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (res.status === 404) {
    return redirect("/genres");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch novel slugs info: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<Genre>;
}