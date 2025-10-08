import SectionHeader from "@/components/section-header";
import { getEldersChoice } from "@/service/novels/api/get-elders-choice";
import { GraduationCap } from "lucide-react";
import NovelsCarousel from "../novels-carousel";

const EldersChoice = async () => {
  const res = (await getEldersChoice()).map(c => c.novel);
  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={GraduationCap} title="Elder's Choice" />
      <NovelsCarousel novels={res} />
    </section>
  )
}

export default EldersChoice;
