'use client'

import GenericNovelList from "@/components/generic-novel-list";
import { mapSortKey, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";

const NovelList = () => {
  const [nuqsParams, setParams] = useQueryStates(nuqsNovelSummariesParams);
  const genres = nuqsParams.genres.join(",");

  const params = useMemo(() => ({
      genres,
      size: 18,
      q: nuqsParams.q,
      page: nuqsParams.page,
      status: nuqsParams.status,
      sort: mapSortKey(nuqsParams.sort),
      chaptersRange: nuqsParams.chaptersRange,
  }), [nuqsParams]);

  const handlePage = (page: number) => {
    setParams({ ...nuqsParams, page });
  }

  return <GenericNovelList
    handlePage={handlePage}
    params={params}
    title={`All Novels`}
    filter={false}
  />
}

export default NovelList;
