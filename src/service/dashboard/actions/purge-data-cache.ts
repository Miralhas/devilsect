'use server'

import { revalidatePath } from "next/cache";

export const purgeDataCache = async (prevState: unknown, payload: boolean): Promise<boolean> => {
  revalidatePath("/", "layout");
  console.log("Purging All Data Cache");
  return payload;
}

export const purgeNovelCache = async (novelSlug: string, prevState: unknown, payload: boolean): Promise<boolean> => {
  revalidatePath(`/novels/${novelSlug}`);
  revalidatePath(`/(core)/novels/${novelSlug}/[chapterSlug]`, "page")
  console.log(`Purging Novel ('${novelSlug}') Data Cache`);
  return payload;
}