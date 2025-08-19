import HistoryTable from "@/components/profile/history/history-table";
import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";

const HistoryPage = async () => {
  const library = await getUserLibrary({ });
  if (!library) redirect("/error");

  return (
    <section className="px-4 md:px-10 pt-4 md:pt-10">
      <HistoryTable library={library} />
    </section>
  )
}

export default HistoryPage;
