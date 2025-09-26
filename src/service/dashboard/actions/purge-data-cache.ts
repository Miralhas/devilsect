'use server'

import { revalidatePath } from "next/cache";

export const purgeDataCache = async (prevState: unknown, payload: boolean): Promise<boolean> => {
  revalidatePath("/", "layout");
  console.log("Purging All Data Cache");
  return payload;
}