'use client'

import { mapSortKey, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { novelSummariesInitialParams } from "@/service/novels/queries/use-get-novel-summaries";
import { Genre } from "@/types/novel";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import GenericNovelList from "../generic-novel-list";

const GenreNovels = ({ genre }: { genre: Genre }) => {
  const [nuqsParams, setParams] = useQueryStates(nuqsNovelSummariesParams);

  const handlePage = (page: number) => {
    setParams({ ...nuqsParams, page });
  }

  const params = useMemo(() => ({
    ...novelSummariesInitialParams,
    page: nuqsParams.page,
    size: 18,
    genres: genre.name,
    sort: mapSortKey(nuqsParams.sort),
  }), [nuqsParams]);

  return <GenericNovelList
    handlePage={handlePage}
    params={params}
    title={`${genre.name} novels`}
  />
}

export default GenreNovels;
