import { env } from "@/env";
import { AuthorInfo } from "@/types/novel";
import { notFound } from "next/navigation";

export const getAuthorByName = async (name: string): Promise<AuthorInfo> => {
  const url = `${env.APP_URL}/authors/${name}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    console.log(`Failed to fetch author ${name}: ${res.status} ${res.statusText}`);
    notFound();
  }

  return await res.json() as Promise<AuthorInfo>;
}