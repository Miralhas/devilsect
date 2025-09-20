'use server'

import { env } from '@/env';
import { UpdateNovelInput, updateNovelSchema } from '@/lib/schemas/update-novel-schema';
import { getSession } from '@/lib/sessions';
import { ApiResponseError } from '@/types/api';
import { Novel } from '@/types/novel';
import { revalidatePath } from 'next/cache';


type AuthenticationFormState = {
  success?: boolean;
  fields?: Record<string, string | string[] | null>;
  errors?: Record<string, string[]>;
}

const DEFAULT_UPDATE_NOVEL_MESSAGE = "Failed to update novel. Try again later!"

export const updateNovelAction = async (novel: Novel, prevState: AuthenticationFormState, payload: UpdateNovelInput): Promise<AuthenticationFormState> => {

  const parsed = updateNovelSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error?.flatten().fieldErrors;
    const fields: AuthenticationFormState["fields"] = { ...payload };
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
      const errors: AuthenticationFormState["errors"] = { error: [data.detail ?? DEFAULT_UPDATE_NOVEL_MESSAGE] };
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
    const errors: AuthenticationFormState["errors"] = { error: [DEFAULT_UPDATE_NOVEL_MESSAGE] }
    return { errors, success: false, fields: parsed.data };
  }

  revalidatePath("/", "layout");
  return { success: true, fields: parsed.data };
}