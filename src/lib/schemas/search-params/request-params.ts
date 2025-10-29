import * as z from "zod";
import { zodPagination } from "../pagination-schema";

export const allowedValues = {
  type: ["NOVEL", "CHAPTER", "FIX_CHAPTER"],
  status: ["DENIED", "PENDING", "COMPLETED"],
} as const;

export const RequestParamsSchema = z.object({
  type: z.enum(allowedValues.type).optional(),
  status: z.enum(allowedValues.status).optional(),
  ...zodPagination
});

export type RequestParams = z.infer<typeof RequestParamsSchema>;

export const requestParamsInitialValues: RequestParams = { page: 0, size: 100 }; 