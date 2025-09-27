import { env } from "@/env";
import { EldersChoice } from "@/types/novel";

export const getEldersChoice = async (): Promise<EldersChoice[]> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/elders-choice`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel summaries: ${res.status} ${res.statusText}`);
  }

  return await res.json() as EldersChoice[];
}
