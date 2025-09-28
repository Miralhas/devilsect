import { env } from "@/env";
import { PaginatedQuery } from "@/types/pagination";

export const getAllNovelSlugs = async (): Promise<PaginatedQuery<string[]>> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/slugs`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel slugs info: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<PaginatedQuery<string[]>>;
}