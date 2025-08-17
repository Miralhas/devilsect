const ProfileStats = () => {
  return (
    <div className="w-full grid grid-cols-[min-content_min-content] justify-center md:grid-cols-4 gap-3 md:gap-6">
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-secondary p-4 px-7 flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">5</p>
        <p className="md:text-lg text-muted-foreground">Read</p>
      </div>
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-secondary p-4 px-7 flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">2</p>
        <p className="md:text-lg text-muted-foreground">Bookmarked</p>
      </div>
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-secondary p-4 px-7 flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">0</p>
        <p className="md:text-lg text-muted-foreground">Completed</p>
      </div>
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-secondary p-4 px-7 flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">2</p>
        <p className="md:text-lg text-muted-foreground">Reviews</p>
      </div>
    </div>
  )
}

export default ProfileStats;
