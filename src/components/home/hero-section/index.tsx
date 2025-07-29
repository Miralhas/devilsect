import Announcements from "./announcements";
import CarouselNovel from "./carousel-novel";

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col md:flex-row gap-12 font-inter">
      <CarouselNovel />
      <Announcements />
    </section>
  )
}

export default HeroSection;
