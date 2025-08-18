import LibraryTable from "@/components/profile/library/library-table";
import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";

const LibraryPage = async () => {
  const library = await getUserLibrary({ bookmarked: true });
  if (!library) redirect("/error");
  return (
    <section className="px-4 md:px-10 pt-4 md:pt-10">
      <LibraryTable library={library} />
    </section>
  )
}

export default LibraryPage;
