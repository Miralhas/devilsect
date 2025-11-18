import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTags } from "../api/get-tags";
import { TagsParams } from "@/lib/schemas/tags-schema";
import { infoKeys } from "./query-keys";

export const getTagsQueryOptions = (params: TagsParams) => queryOptions({
  queryFn: () => getTags(params),
  queryKey: infoKeys.tags(params),
});
export const useGetTags = (params: TagsParams) => useQuery(getTagsQueryOptions(params));
export const getTagsInitialParams: TagsParams = { page: 0, size: 50, firstLetter: "a", q: "" };