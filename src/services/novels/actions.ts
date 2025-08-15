'use server'

import { Novel } from "@/types/novel";
import { bookmarkNovel, removeNovelBookmark } from "./api";
import { revalidateTag } from "next/cache";
import { capitalize } from "@/lib/utils";

type ActionState = {
  success?: boolean;
  message?: string;
}

type PayloadBookmark = |
{
  type: "ADD";
  novel: Novel;
} | {
  type: "REMOVE";
  libraryId: number;
  novel: Novel;
}

export const bookmarkNovelAction = async (prevState: unknown, payload: PayloadBookmark): Promise<ActionState> => {
  let message: string;
  try {
    if (payload.type === "ADD") {
      await bookmarkNovel(payload.novel.slug);
      message = `Saved ${capitalize(payload.novel.title)} to bookmarks!`
    } else {
      await removeNovelBookmark(payload.libraryId)
      message = `Removed ${capitalize(payload.novel.title)} from bookmarks!`
    }
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }

  revalidateTag("library")
  return { success: true, message };
}