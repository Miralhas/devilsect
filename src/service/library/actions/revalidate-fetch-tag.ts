'use server'

import { revalidateTag } from "next/cache";

export const revalidateFetchTag = async () => {
  revalidateTag("library")
}