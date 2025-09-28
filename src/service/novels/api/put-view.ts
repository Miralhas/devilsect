import { env } from "@/env";
import { ApiResponseError } from "@/types/api";

export const putView = async (novelSlug: string): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/metrics/${novelSlug}/view`;

  const res = await fetch(url, {
    method: "PUT",
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    console.log(data.detail ?? "failed to post novel view");
  }
}