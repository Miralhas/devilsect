import { env } from "@/env";

export const putView = async (novelSlug: string): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/metrics/${novelSlug}/view`;

  const res = await fetch(url, {
    method: "put",
  });

  if (!res.ok) {
    console.log("failed to post novel view");
  }
}