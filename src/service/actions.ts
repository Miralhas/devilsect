'use server'

import { revalidatePath as revalidateP } from "next/cache";

export const revalidatePath = async (
  path: string,
  type: "page" | "layout" = "page"
) => revalidateP(path, type);

export const purgeNovelCache = async (novelSlug: string): Promise<void> => {
  revalidateP(`/novels/${novelSlug}`);
  revalidateP(`/(core)/novels/${novelSlug}/[chapterSlug]`, "page")
}