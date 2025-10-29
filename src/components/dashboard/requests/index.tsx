'use client'

import Loading from "@/components/loading";
import { requestParamsInitialValues } from "@/lib/schemas/search-params/request-params";
import { useGetAllRequests } from "@/service/requests/queries/use-get-requests";
import { RequestUnion } from "@/types/request";
import BaseRequestWrapper from "./base-request-wrapper";
import ChapterRequestCard from "./chapter-request-card";
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
  const query = useGetAllRequests(requestParamsInitialValues);

  if (query.isLoading || query.isError) {
    return <Loading />
  }

  if (query.data && !query.data?.totalItems) {
    return <div>Empty...</div>
  }

  return (
    <section className="p-4 grid grid-cols-1 gap-6 max-w-[800px]">
      {query.data?.results.map(req => (
        <BaseRequestWrapper request={req} key={req.id}>
          {renderRequest(req)}
        </BaseRequestWrapper>
      ))}
    </section>
  )
}

export default RequestsCointainer;
