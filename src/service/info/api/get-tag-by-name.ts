import { env } from "@/env";
import { Tag } from "@/types/novel";
import { redirect } from "next/navigation";

export const getTagBySlug = async (slug: string): Promise<Tag> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/tags/${slug}`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (res.status === 404) {
    return redirect("/tags");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch tag: ${res.status} ${res.statusText}`);
  }

  return await res.json() as Promise<Tag>;
}