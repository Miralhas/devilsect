import { env } from "@/env";
import { Metrics } from "@/types/novel";

export const getNovelMetrics = async (novelSlug: string) => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/metric`;
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch novel metrics: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Metrics;
}