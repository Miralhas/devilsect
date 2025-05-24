
const HomePage = () => {
  return (
    <div className="min-h-[200vh]">
      <div className="mt-4 w-full p-8 space-y-10">
        <p className="font-roboto font-bold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui a expedita animi facere consequuntur asperiores, exercitationem laborum laboriosam commodi tempore fuga eaque est eveniet maiores ea laudantium repudiandae, culpa quaerat.
        </p>
        <p className="font-tilt-warp">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui a expedita animi facere consequuntur asperiores, exercitationem laborum laboriosam commodi tempore fuga eaque est eveniet maiores ea laudantium repudiandae, culpa quaerat.
        </p>
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
