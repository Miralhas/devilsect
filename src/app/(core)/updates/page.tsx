import UpdatesGrid from "@/components/updates/updates-grid";
import { getRecentlyAddedChapters } from "@/services/novels/server-queries";

const UpdatesPage = async () => {
  const recent = await getRecentlyAddedChapters();
  return (
    <section className="w-full">
      <UpdatesGrid recent={recent}  />
    </section>
  )
}

export default UpdatesPage;
