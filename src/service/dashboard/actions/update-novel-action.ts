'use server'

import { UpdateNovelInput, updateNovelSchema } from "@/lib/schemas/update-novel-schema";
import { DashboardFormState } from "@/types/action-state";
import { Novel } from "@/types/novel";
import { revalidatePath } from "next/cache";
import { updateNovel } from "../api/update-novel";
import { ApiError } from "@/service/api-error";

const DEFAULT_UPDATE_NOVEL_MESSAGE = "Failed to update novel. Try again later!";

export const updateNovelAction = async (
  novel: Novel, prevState: DashboardFormState, payload: UpdateNovelInput
): Promise<DashboardFormState> => {
  const parsed = updateNovelSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    const fields: DashboardFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    await updateNovel(novel, parsed.data);
  } catch (err) {
    if (err instanceof ApiError) {
      const errors: DashboardFormState["errors"] = { error: err.detail, ...err.errors };
      return { errors, success: false, fields: parsed.data };
    }
      const errors: DashboardFormState["errors"] = { error: DEFAULT_UPDATE_NOVEL_MESSAGE }
      return { errors, success: false, fields: parsed.data };
  }

  revalidatePath(`/novels/${novel.slug}`);
  revalidatePath(`/(core)/novels/${novel.slug}/[chapterSlug]`, "page")
  return { success: true, fields: parsed.data };
}