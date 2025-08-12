// 'server only'

import { env } from "@/env";
import { Chapter, ChapterSummary } from "@/types/chapter"
import { PaginatedQuery } from "@/types/pagination";
import { notFound } from "next/navigation";

export const getChapterBySlug = async (chapterSlug: string, novelSlug: string): Promise<Chapter> => {
  const url = `${env.APP_URL}/novels/${novelSlug}/chapters/${chapterSlug}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    console.log(`Failed to fetch chapter ${chapterSlug}: ${res.status} ${res.statusText}`);
    notFound();
  }

  return await res.json() as Promise<Chapter>;
}

export const getNovelChapterSummaries = async (novelSlug: string, page: number, size: number): Promise<PaginatedQuery<ChapterSummary[]>> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters?page=${page}&size=${size}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("failed to fetch novel chapters");
  }

  return await res.json() as Promise<PaginatedQuery<ChapterSummary[]>>;
}