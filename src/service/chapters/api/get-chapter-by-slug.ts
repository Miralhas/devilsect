import { env } from "@/env";
import { Chapter } from "@/types/chapter";
import { notFound } from "next/navigation";

export const getChapterBySlug = async (chapterSlug: string, novelSlug: string): Promise<Chapter> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters/${chapterSlug}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    console.log(`Failed to fetch chapter ${chapterSlug} from novel ${novelSlug}: ${res.status} ${res.statusText}`);
    notFound();
  }

  return await res.json() as Promise<Chapter>;
}