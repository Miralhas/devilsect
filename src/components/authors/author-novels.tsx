'use client'

import { mapSortKey, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { novelSummariesInitialParams } from "@/service/novels/queries/use-get-novel-summaries";
import { AuthorInfo } from "@/types/novel";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import GenericNovelList from "../generic-novel-list";

const AuthorNovels = ({ author }: { author: AuthorInfo }) => {
  const [nuqsParams, setParams] = useQueryStates(nuqsNovelSummariesParams);

  const params = useMemo(() => ({
    ...novelSummariesInitialParams,
    page: nuqsParams.page,
    size: 18,
    sort: mapSortKey(nuqsParams.sort),
    author: author.name
  }), [nuqsParams]);

  const handlePage = (page: number) => {
    setParams({ ...nuqsParams, page });
  }

  return <GenericNovelList
    handlePage={handlePage}
    params={params}
    title={`${author.name} novels`}
  />
}

export default AuthorNovels;
