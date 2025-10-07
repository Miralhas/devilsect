'use client'

import SectionHeader from "@/components/section-header";
import { SortKey } from "@/lib/schemas/search-params/user-library-params-schema";
import { useGetUserLibrary } from "@/service/library/queries/get-user-library";
import { HistoryIcon } from "lucide-react";
import HistoryNovels from "./history-novels";

const UserHistory = () => {
  const libraryQuery = useGetUserLibrary({ size: 6, sort: SortKey.LAST_READ });

  const noResults = !libraryQuery.data || libraryQuery.data?.results.length <= 0;

  if (noResults || libraryQuery.isLoading || libraryQuery.isError) {
    return null;
  }

  return (
    <section className="w-full space-y-6">
      <SectionHeader
        icon={HistoryIcon}
        title="Reading History"
        viewMore={{ title: "History", href: "/profile/history" }}
      />
      <HistoryNovels library={libraryQuery.data.results} />
    </section>
  )
}

export default UserHistory;
