import HeroSection from "@/components/home/hero-section";

const HomePage = () => {
  return (
    <div className="min-h-[200vh]">
      <div className="mt-4 w-full p-2 space-y-10">
        <HeroSection />
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui a expedita animi facere consequuntur asperiores, exercitationem laborum laboriosam commodi tempore fuga eaque est eveniet maiores ea laudantium repudiandae, culpa quaerat.
          </p>
        ))}
      </div>
    </div>
  )
}

export default HomePage;
