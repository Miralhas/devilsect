import { env } from "@/env";
import { Series } from "@/types/novel";
import { notFound } from "next/navigation";

export const getSeriesBySlug = async (slug: string): Promise<Series> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/series/${slug}`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (res.status === 404) {
    return notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch series: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<Series>;
}