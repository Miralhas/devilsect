import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { delay } from "@/lib/utils";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";

type Props = {
  url: string;
} & PaginationSchemaParams;

export const getComments = async ({ url }: Props): Promise<PaginatedQuery<ThreadedComment[]>> => {
  await delay(3000)
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}