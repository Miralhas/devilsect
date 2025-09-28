import { env } from "@/env";
import { Genre } from "@/types/novel";

export const getGenres = async () => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/genres`;
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch genres: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Genre[]
}