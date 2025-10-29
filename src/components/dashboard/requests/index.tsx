'use client'

import Loading from "@/components/loading";
import { RequestParams, requestParamsInitialValues } from "@/lib/schemas/search-params/request-params";
import { useGetAllRequests } from "@/service/requests/queries/use-get-requests";
import { RequestUnion } from "@/types/request";
import { useState } from "react";
import BaseRequestWrapper from "./base-request-wrapper";
import ChapterRequestCard from "./chapter-request-card";
import StatusFilter from "./filters/status-filter";
import TypeFilter from "./filters/type-filter";
import FixChapterRequestCard from "./fix-chapter-request-card";
import NovelRequestCard from "./novel-request-card";

const renderRequest = (request: RequestUnion) => {
  switch (request.type) {
    case "NOVEL_REQUEST": return <NovelRequestCard title={request.novelTitle} />;
    case "CHAPTER_REQUEST": return <ChapterRequestCard request={request} />;
    case "FIX_CHAPTER_REQUEST": return <FixChapterRequestCard request={request} />;
  }
}


const RequestsCointainer = () => {
  const [typeFilter, setTypeFilter] = useState<RequestParams["type"]>(undefined);
  const [statusFilter, setStatusFilter] = useState<RequestParams["status"]>("PENDING");

  const query = useGetAllRequests({
    ...requestParamsInitialValues,
    status: statusFilter,
    type: typeFilter
  });

  const isEmpty = query.data && !query.data?.totalItems;

  if (query.isLoading || query.isError) {
    return (
      <section className="p-4 grid grid-cols-1 gap-6 max-w-[800px]">
        <div className="space-y-2.5">
          <TypeFilter current={typeFilter} setFilter={setTypeFilter} />
          <StatusFilter current={statusFilter} setFilter={setStatusFilter} />
        </div>
        <Loading />
      </section>
    )
  }

  return (
    <section className="p-4 grid grid-cols-1 gap-6 max-w-[800px]">
      <div className="space-y-4">
        <TypeFilter current={typeFilter} setFilter={setTypeFilter} />
        <StatusFilter current={statusFilter} setFilter={setStatusFilter} />
      </div>
      {isEmpty ? (
        <p>Empty...</p>
      ) : (
        query.data?.results.map(req => (
          <BaseRequestWrapper request={req} key={req.id}>
            {renderRequest(req)}
          </BaseRequestWrapper>
        ))
      )}
    </section>
  )
}



export default RequestsCointainer;
