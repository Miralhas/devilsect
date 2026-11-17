import { GenericQueryConfig } from "@/types/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getJobById } from "../api/get-job-by-id";
import { jobKeys } from "./query-key";

type JobConfig = GenericQueryConfig<typeof getJobById>;

export const getJobByIdQueryOptions = (id: number, options?: JobConfig) => queryOptions({
  queryFn: () => getJobById(id),
  queryKey: jobKeys.getJobById(id),
  ...options,
});

export const useGetJobByIdQuery = (id: number, options?: JobConfig) => useQuery(
  getJobByIdQueryOptions(id, options)
);