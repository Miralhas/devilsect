import NovelCard from "@/components/novel-card";
import SectionHeader from "@/components/section-header";
import { getNovelSummariesPaginated } from "@/services/novels/server-queries";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import ShowMoreButton from "../ranking-section/show-more-button";

const EldersChoice = async () => {
  const res = await getNovelSummariesPaginated({ size: 12 });
  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={GraduationCap} title="Elder's Choice" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4 max-h-[320px] overflow-hidden" id="elders-choice-grid">
          {res.results.map(novel => (
            <Link className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block" key={novel.id} href="/">
              <NovelCard novelSummary={novel} size="lg" />
            </Link>
          ))}
        </div>
      <ShowMoreButton elementId="elders-choice-grid" className="max-h-[320px]" />
    </section>
  )
}

export default EldersChoice;
