'use client'

import { mapSortKey, nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { novelSummariesInitialParams } from "@/service/novels/queries/use-get-novel-summaries";
import { Tag } from "@/types/novel";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";
import GenericNovelList from "../generic-novel-list";

const TagNovels = ({ tag }: { tag: Tag }) => {
  const [nuqsParams, setParams] = useQueryStates(nuqsNovelSummariesParams);

  const params = useMemo(() => ({
    ...novelSummariesInitialParams,
    page: nuqsParams.page,
    size: 18,
    tags: tag.name,
    sort: mapSortKey(nuqsParams.sort)
  }), [nuqsParams]);

  const handlePage = (page: number) => {
    setParams({ ...nuqsParams, page });
  }

  return <GenericNovelList
    handlePage={handlePage}
    params={params}
    title={`${tag.name} novels`}
  />
}

export default TagNovels;
