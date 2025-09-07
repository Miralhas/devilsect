import { useQuery } from "@tanstack/react-query";
import { getComments } from "./api";

export const useGetComments = ({ url }: { url: string }) => useQuery({
  queryFn: () => getComments({ url }),
  queryKey: ["comments", url],
});