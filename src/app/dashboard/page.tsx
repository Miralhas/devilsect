import DisplayNovels from "@/components/dashboard/display-novels";
import DisplayUsers from "@/components/dashboard/display-users";
import DashboardSearch from "@/components/dashboard/search/dashboard-search";
import { Button } from "@/components/ui/button";
import { purgeDataCache } from "@/services/dashboard/actions";

const LayoutPage = () => {
  return (
    <section className="container w-full mx-auto space-y-12">
      <div className="flex w-full items-center justify-center">
        <DashboardSearch />
      </div>
      <Button onClick={purgeDataCache} variant="cool">Purge Data Cache</Button>
      <DisplayUsers />
      <DisplayNovels />
    </section>
  )
}

export default LayoutPage;
