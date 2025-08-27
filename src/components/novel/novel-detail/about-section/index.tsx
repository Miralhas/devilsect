import { Novel } from "@/types/novel";
import Tabs from "./tabs";

const AboutSection = ({ novel }: { novel: Novel }) => {
  return (
    <section className="space-y-5">
      <Tabs novel={novel} />
    </section>
  )
}

export default AboutSection;
