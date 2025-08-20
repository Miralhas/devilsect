import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";
import HistoryGrid from "./history-grid";

const HistoryTable = async () => {
  const library = await getUserLibrary({ size: 100 });
  if (!library) redirect("/error");
  
  return (
    <div className="w-full space-y-8">
      <HistoryGrid library={library.results} />
    </div>
  )
}

export default HistoryTable;
