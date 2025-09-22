import DisplayNovels from "@/components/dashboard/display-novels";
import DisplayUsers from "@/components/dashboard/display-users";
import PurgeCache from "@/components/dashboard/purge-cache";
import DashboardSearch from "@/components/dashboard/search/dashboard-search";

const LayoutPage = () => {
  return (
    <section className="container w-full mx-auto space-y-12">
      <div className="flex w-full items-center justify-center">
        <DashboardSearch />
      </div>
      <PurgeCache />
      <DisplayUsers />
      <DisplayNovels />
    </section>
  )
}

export default LayoutPage;
