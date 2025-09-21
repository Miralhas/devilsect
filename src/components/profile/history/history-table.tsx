import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";
import HistoryGrid from "./history-grid";
import HistoryHeader from "./history-header";

const HistoryTable = async () => {
  const library = await getUserLibrary({ size: 100 }, "no-store");
  if (!library) redirect("/error");
  
  return (
    <div className="w-full space-y-8">
      <HistoryHeader />
      <HistoryGrid library={library.results} />
    </div>
  )
}

export default HistoryTable;
