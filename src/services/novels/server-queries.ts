import { env } from "@/env";
import { NovelSummariesParams, NovelSummariesParamsSchema } from "@/lib/schemas/novel-summaries-params-schema";
import { UserLibraryParams, UserLibraryParamsSchema } from "@/lib/schemas/user-library-params-schema";
import { getSession } from "@/lib/sessions";
import { buildQueryString } from "@/lib/utils";
import { ApiResponseError } from "@/types/api";
import { Library } from "@/types/library";
import { EldersChoice, Novel, NovelSummary } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";
import { notFound } from "next/navigation";

export const getNovelSummariesPaginated = async (params: NovelSummariesParams): Promise<PaginatedQuery<NovelSummary[]>> => {
  const parsed = NovelSummariesParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.APP_URL}/novels${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as PaginatedQuery<NovelSummary[]>;
}

export const getNovelBySlug = async (slug: string) => {
  const url = `${env.APP_URL}/novels/${slug}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    console.log(`Failed to fetch novel ${slug}: ${res.status} ${res.statusText}`);
    notFound();
  }

  return await res.json() as Promise<Novel>;
}

export const getEldersChoice = async (): Promise<EldersChoice[]> => {
  const url = `${env.APP_URL}/elders-choice`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as EldersChoice[];
}

export const getRecentlyAddedChapters = async (): Promise<RecentlyAddedChapter[]> => {
  const url = `${env.APP_URL}/latest-chapters`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as RecentlyAddedChapter[]
}

export const getUserLibrary = async (params: UserLibraryParams): Promise<PaginatedQuery<Library[]> | undefined> => {
  const session = await getSession();
  if (!session) return;


  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const parsed = UserLibraryParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library${queryString}`

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
    next: { tags: ["library"] }
  });

  if (!res.ok) {
    const error: ApiResponseError = await res.json();
    console.error(`Error trying to [GET] user History: ${error.detail}`);
  }

  return await res.json() as PaginatedQuery<Library[]>;
}

export const addChapterToUserHistory = async (requestBody: { novelId: number, chapterId: number }) => {
  const session = await getSession();
  if (!session) return;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library`;

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ chapterId: requestBody.chapterId, novelId: requestBody.novelId }),
  });

  if (!res.ok) {
    const error: ApiResponseError = await res.json();
    console.error(`Error trying to [PUT] novel chapter to user History: ${error.detail}`);
  }
}