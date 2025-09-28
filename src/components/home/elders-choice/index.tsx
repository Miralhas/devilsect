import SectionHeader from "@/components/section-header";
import { getEldersChoice } from "@/service/novels/api/get-elders-choice";
import { GraduationCap } from "lucide-react";
import ChoicesCarousel from "./choices-carousel";

const EldersChoice = async () => {
  const res = await getEldersChoice();
  return (
    <section className="w-full space-y-6">
      <SectionHeader icon={GraduationCap} title="Elder's Choice" />
      <ChoicesCarousel choices={res} />
    </section>
  )
}

export default EldersChoice;
