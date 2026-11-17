import { UseQueryOptions } from "@tanstack/react-query";

export type GenericQueryConfig<T extends (...args: any[]) => any> = Omit<
  UseQueryOptions<Awaited<ReturnType<T>>>,
  'queryKey' | 'queryFn'
>;