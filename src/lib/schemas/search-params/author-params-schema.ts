import { parseAsIndex, parseAsStringLiteral } from 'nuqs/server';
import z from 'zod';
import { zodPagination } from '../pagination-schema';

export const sortKeyParams = ['count', 'name'] as const

export enum SortKey {
  COUNT = "novelsCount,name,desc",
  NAME = "name,novelsCount,desc"
}

export const mapSortKey = (key: typeof sortKeyParams[number]) => {
  switch (key) {
    case "count": return SortKey.COUNT;
    case "name": return SortKey.NAME;
  }
}

const SORT = [SortKey.COUNT, SortKey.NAME] as const;

export const AuthorsParamsSchema = z.object({
  sort: z.enum(SORT).catch(SortKey.COUNT).optional(),
  ...zodPagination,
});

export const nuqsAuthorsParams = {
  page: parseAsIndex.withDefault(0).withOptions({ clearOnDefault: true, history: "push", scroll: true }),
  sort: parseAsStringLiteral(sortKeyParams).withDefault('count').withOptions({ clearOnDefault: true, }),
}

export type AuthorsParams = z.infer<typeof AuthorsParamsSchema>;
export const initialAuthorsParams: Required<AuthorsParams> = {
  page: 0,
  size: 50,
  sort: SortKey.COUNT
}