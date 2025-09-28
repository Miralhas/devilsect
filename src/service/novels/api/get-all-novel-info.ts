import { env } from "@/env";
import { NovelInfo } from "@/types/novel";

export const getAllNovelInfo = async (): Promise<NovelInfo[]> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/info/novels`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novels info: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<NovelInfo[]>;
}
