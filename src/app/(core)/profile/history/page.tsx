import HistoryTable from "@/components/profile/history/history-table";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";

const HistoryPage = async () => {
  const library = await getUserLibrary({ size: 100 });
  if (!library) redirect("/error");

  return (
    <section className="p-4 md:p-10 space-y-6 md:space-y-12">
      <ProfileHeader />
      <HistoryTable library={library} />
    </section>
  )
}

export default HistoryPage;
