'use server'

import { UpdateChapterInput, updateChapterSchema } from "@/lib/schemas/update-chapter-schema";
import { DashboardFormState } from "@/types/action-state";
import { Chapter } from "@/types/chapter";
import { revalidatePath } from "next/cache";
import { updateChapter } from "../api/update-chapter";
import { ApiError } from "@/service/api-error";

const DEFAULT_UPDATE_CHAPTER_MESSAGE = "Failed to update chapter. Try again later!";

export const updateChapterAction = async (
  chapter: Chapter, prevState: DashboardFormState, payload: UpdateChapterInput
): Promise<DashboardFormState> => {

  const parsed = updateChapterSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    const fields: DashboardFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    await updateChapter(chapter, parsed.data);
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: DashboardFormState["errors"] = { error: err.detail, ...err.errors };
      return { errors, success: false, fields: parsed.data };
    }
    const errors: DashboardFormState["errors"] = { error: [DEFAULT_UPDATE_CHAPTER_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }

  revalidatePath("/", "layout");
  return { success: true, fields: parsed.data };
}