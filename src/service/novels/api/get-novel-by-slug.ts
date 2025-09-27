import { env } from "@/env";
import { Novel } from "@/types/novel";
import { notFound } from "next/navigation";

export const getNovelBySlug = async (slug: string) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    console.log(`Failed to fetch novel ${slug}: ${res.status} ${res.statusText}`);
    notFound();
  }

  return await res.json() as Promise<Novel>;
}