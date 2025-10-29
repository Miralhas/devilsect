import { RequestParams } from "@/lib/schemas/search-params/request-params";

export const requestKeys = {
  all: ["request"],
  getRequests: (params: RequestParams) => [...requestKeys.all, "list", params]
}