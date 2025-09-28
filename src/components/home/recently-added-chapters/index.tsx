import SectionHeader from "@/components/section-header";
import { getLatestChapters } from "@/service/info/api/get-latest-chapters";
import { Clock } from "lucide-react";
import ChaptersGrid from "./chapters-grid";

const RecentlyAddedChapters = async () => {
  const chapters = await getLatestChapters({ size: 32 });
  return (
    <section className="space-y-4 w-full">
      <SectionHeader icon={Clock} title="Recently Added Chapters" viewMore={{ href: "/updates", title: "View More" }} />
      <div className="w-full">
        <ChaptersGrid chapters={chapters} />
      </div>
    </section>
  )
}

export default RecentlyAddedChapters;
