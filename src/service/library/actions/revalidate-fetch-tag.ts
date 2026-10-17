'use server'

import { revalidateTag } from "next/cache";
import { updateTag } from 'next/cache'

export const revalidateFetchTag = async () => {
  updateTag("library")
}