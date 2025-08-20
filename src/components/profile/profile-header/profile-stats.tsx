import { UserInfo } from "@/types/authentication";

const ProfileStats = ({ user }: { user: UserInfo }) => {
  return (
    <div className="w-full grid grid-cols-2 justify-center md:grid-cols-4 gap-3 md:gap-6">
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-zinc-500/20 p-4  flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">{user.readCount}</p>
        <p className="md:text-lg text-muted-foreground">Read</p>
      </div>
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-zinc-500/20 p-4  flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">{user.bookmarkCount}</p>
        <p className="md:text-lg text-muted-foreground">Bookmarked</p>
      </div>
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-zinc-500/20 p-4  flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">{user.completedCount}</p>
        <p className="md:text-lg text-muted-foreground">Completed</p>
      </div>
      <div className="col-span-1 bg-secondary/40 rounded-xl border border-zinc-500/20 p-4  flex flex-col items-center md:items-start">
        <p className="text-xl font-bold">{user.reviewsCount}</p>
        <p className="md:text-lg text-muted-foreground">Reviews</p>
      </div>
    </div>
  )
}

export default ProfileStats;
