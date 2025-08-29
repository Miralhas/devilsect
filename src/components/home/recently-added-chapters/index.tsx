import SectionHeader from "@/components/section-header";
import { getRecentlyAddedChapters } from "@/services/novels/server-queries";
import { Clock } from "lucide-react";
import ChaptersCarousel from "./chapters-carousel";

const RecentlyAddedChapters = async () => {
  const chapters = await getRecentlyAddedChapters();
  return (
    <section className="space-y-4 w-full">
      <SectionHeader icon={Clock} title="Recently Added Chapters" viewMore={{ href: "/updates", title: "View More" }} />
      <div className="w-full">
        <ChaptersCarousel chapters={chapters} />
      </div>
    </section>
  )
}

export default RecentlyAddedChapters;
