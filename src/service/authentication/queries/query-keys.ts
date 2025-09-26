import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";

export const authKeys = {
  all: ["user"],
  notificationCount: () => [...authKeys.all, "notifications"],
  allUsers: (params: PaginationSchemaParams) => [...authKeys.all, "list", params],
};