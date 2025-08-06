import NovelCard from "@/components/novel-card";
import SectionHeader from "@/components/section-header";
import { getEldersChoice } from "@/services/novels/server-queries";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

const SIZE = 6;

const EldersChoice = async () => {
  const res = await getEldersChoice();
  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={GraduationCap} title="Elder's Choice" />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4 grid-rows-1" id="elders-choice-grid">
        {res.slice(0, SIZE).map(choice => (
          <Link className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block" key={choice.id} href="/">
            <NovelCard novelSummary={choice.novel} size="lg" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default EldersChoice;
