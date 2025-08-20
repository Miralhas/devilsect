import HistoryTable from "@/components/profile/history/history-table";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";

const HistoryPage = async () => {
  const library = await getUserLibrary({ size: 100 });
  if (!library) redirect("/error");

  return (
    <>
      <ProfileHeader />
      <section className="px-4 md:px-10 pt-4 md:pt-10">
        <HistoryTable library={library} />
      </section>
    </>
  )
}

export default HistoryPage;
