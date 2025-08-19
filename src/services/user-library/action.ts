'use server'

import { capitalize } from "@/lib/utils";
import { Novel } from "@/types/novel";
import { revalidateTag } from "next/cache";
import { deleteBookmark, deleteComplete, putBookmark, putComplete } from "./api";

type ActionState = {
  success?: boolean;
  message?: string;
}

export const completeAction = async (prevState: unknown, payload: { novelSlug: string, novelTitle: string }): Promise<ActionState> => {
  try {
    await putComplete(payload.novelSlug);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
  // revalidateTag("library");
  return { success: true, message: `Marked ${capitalize(payload.novelTitle)} as complete!` };
}

export const deleteCompleteAction = async (prevState: unknown, payload: { novelTitle: string, libraryId: number }): Promise<ActionState> => {
  try {
    await deleteComplete(payload.libraryId);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
  // revalidateTag("library");
  return { success: true, message: `Marked ${capitalize(payload.novelTitle)} as incomplete!` };
}

export const bookmarkAction = async (prevState: unknown, novel: Novel): Promise<ActionState> => {
  try {
    await putBookmark(novel.slug);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }

  revalidateTag("library");
  return { success: true, message: `Saved ${capitalize(novel.title)} to bookmarks!` };
}

export const deleteBookmarkAction = async (prevState: unknown, payload: { novelTitle: string, libraryId: number }): Promise<ActionState> => {
  try {
    await deleteBookmark(payload.libraryId);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
  return { success: true, message: `Removed ${capitalize(payload.novelTitle)} from bookmarks!` };
}


export const revalidateFetchTag = async () => {
  revalidateTag("library")
}