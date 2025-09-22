'use server'

import { env } from '@/env';
import { UpdateChapterInput, updateChapterSchema } from '@/lib/schemas/update-chapter-schema';
import { UpdateNovelInput, updateNovelSchema } from '@/lib/schemas/update-novel-schema';
import { getSession } from '@/lib/sessions';
import { ApiResponseError } from '@/types/api';
import { Chapter } from '@/types/chapter';
import { Novel } from '@/types/novel';
import { revalidatePath } from 'next/cache';


type DashboardFormState = {
  success?: boolean;
  fields?: Record<string, string | string[] | null | number>;
  errors?: Record<string, string[]>;
}

type ActionState = {
  success?: boolean;
  message?: string;
}

const DEFAULT_UPDATE_NOVEL_MESSAGE = "Failed to update novel. Try again later!";
const DEFAULT_UPDATE_CHAPTER_MESSAGE = "Failed to update chapter. Try again later!";
const DEFAULT_EDIT_NOVEL_IMAGE_MESSAGE = "Failed to Edit Novel Image. Try again later";

export const updateNovelAction = async (novel: Novel, prevState: DashboardFormState, payload: UpdateNovelInput): Promise<DashboardFormState> => {

  const parsed = updateNovelSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    const fields: DashboardFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    const url = `${env.APP_URL}/novels/${novel.slug}`;

    const session = await getSession();
    if (!session) throw new Error(DEFAULT_UPDATE_NOVEL_MESSAGE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session?.value}`);
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(parsed.data)
    });

    if (!res.ok) {
      const data: ApiResponseError = await res.json();
      console.log(data);
      const errors: DashboardFormState["errors"] = { error: [data.detail ?? DEFAULT_UPDATE_NOVEL_MESSAGE] };
      if (data.errors?.title) errors["title"] = [data.errors?.title];
      if (data.errors?.author) errors["author"] = [data.errors?.author];
      if (data?.errors?.alias) errors["alias"] = [data.errors?.alias];
      if (data?.errors?.status) errors["status"] = [data.errors?.status];
      if (data?.errors?.description) errors["description"] = [data.errors?.description];
      if (data?.errors?.genres) errors["genres"] = [data.errors?.genres];
      if (data?.errors?.tags) errors["tags"] = [data.errors?.tags];
      return { errors, success: false, fields: parsed.data };
    }

  } catch (error) {
    console.log(error);
    const errors: DashboardFormState["errors"] = { error: [DEFAULT_UPDATE_NOVEL_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }

  revalidatePath("/", "layout");
  return { success: true, fields: parsed.data };
}

export const updateChapterAction = async (chapter: Chapter, prevState: DashboardFormState, payload: UpdateChapterInput): Promise<DashboardFormState> => {

  const parsed = updateChapterSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    const fields: DashboardFormState["fields"] = { ...payload };
    return { success: false, fields, errors };
  }

  try {
    const url = `${env.APP_URL}/novels/${chapter.novelSlug}/chapters/${chapter.slug}`;

    const session = await getSession();
    if (!session) throw new Error(DEFAULT_UPDATE_CHAPTER_MESSAGE);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session?.value}`);
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(parsed.data)
    });

    if (!res.ok) {
      const data: ApiResponseError = await res.json();
      console.log(data);
      const errors: DashboardFormState["errors"] = { error: [data.detail ?? DEFAULT_UPDATE_CHAPTER_MESSAGE] };
      if (data.errors?.title) errors["title"] = [data.errors?.title];
      if (data.errors?.author) errors["author"] = [data.errors?.author];
      if (data?.errors?.alias) errors["alias"] = [data.errors?.alias];
      if (data?.errors?.status) errors["status"] = [data.errors?.status];
      if (data?.errors?.description) errors["description"] = [data.errors?.description];
      if (data?.errors?.genres) errors["genres"] = [data.errors?.genres];
      if (data?.errors?.tags) errors["tags"] = [data.errors?.tags];
      return { errors, success: false, fields: parsed.data };
    }

  } catch (error) {
    console.log(error);
    const errors: DashboardFormState["errors"] = { error: [DEFAULT_UPDATE_CHAPTER_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }

  revalidatePath("/", "layout");
  return { success: true, fields: parsed.data };
}

export const editNovelImage = async (novel: Novel, prevState: unknown, payload: { imageBlob: Blob }): Promise<ActionState> => {
  const session = await getSession();
  if (!session) throw new Error(DEFAULT_EDIT_NOVEL_IMAGE_MESSAGE);

  const formData = new FormData();

  formData.append("file", payload.imageBlob);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`, {
      headers: { "Authorization": `Bearer ${session.value}` },
      body: formData,
      method: "PUT"
    });

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.detail ?? DEFAULT_EDIT_NOVEL_IMAGE_MESSAGE };
    }

  } catch (err) {
    console.log(err);
    return { success: false, message: DEFAULT_EDIT_NOVEL_IMAGE_MESSAGE };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Success!" };
}

export const purgeDataCache = async (prevState: unknown, payload: boolean): Promise<boolean> => {
  revalidatePath("/", "layout");
  console.log("Purging All Data Cache");
  return payload;
}