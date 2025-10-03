import z from 'zod';
import { zodPagination } from '../pagination-schema';

export enum SortKey {
  COUNT = "novelsCount,name,desc",
  NAME = "name,novelsCount,desc"
}

const SORT = [SortKey.COUNT, SortKey.NAME] as const;

export const AuthorsParamsSchema = z.object({
  sort: z.enum(SORT).catch(SortKey.COUNT).optional(),
  ...zodPagination,
});

export type AuthorsParams = z.infer<typeof AuthorsParamsSchema>;

export const initialAuthorsParams: Required<AuthorsParams> = {
  page: 0,
  size: 50,
  sort: SortKey.COUNT
}