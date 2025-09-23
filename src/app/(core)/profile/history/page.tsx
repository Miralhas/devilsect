import HistoryTable from "@/components/profile/history/history-table";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileLoading from "@/components/profile/profile-loading";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Reading History"
};

const HistoryPage = async () => {
  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <Suspense fallback={<ProfileLoading />}>
        <HistoryTable />
      </Suspense>
    </section>
  )
}

export default HistoryPage;
