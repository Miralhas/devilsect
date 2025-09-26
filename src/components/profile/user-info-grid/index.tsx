import { formatFullDate, roleMap } from "@/lib/utils";
import { getCurrentUserInfo } from "@/service/authentication/api/get-current-user-info";
import { UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import RoleBadge from "../profile-header/role-badge";

const UserInfoGrid = async () => {
  const user = await getCurrentUserInfo();
  if (!user) redirect("/login");

  const lastActivity = user.lastActivity ? formatFullDate(user.lastActivity) : "No activity recorded yet.";

  return (
    <div className="space-y-2.5 md:space-y-6">
      <div className="flex items-center gap-2 w-full px-3">
        <div className="size-10 bg-primary/50 text-accent flex items-center justify-center border border-accent/70 rounded-md">
          <UserIcon className="size-6" />
        </div>
        <span className="font-semibold tracking-wide text-2xl">
          Profile Info
        </span>
      </div>
      <div className="w-full">
        <div className="border-b">
          <div className="md:grid md:grid-cols-[minmax(0,0.20fr)_minmax(0,1fr)] md:gap-5 space-y-2 md:space-y-0 p-4 duration-300 ease-in-out transition-colors hover:bg-secondary/55">
            <p className="text-muted-foreground font-medium">Username</p>
            <p className="text-zinc-300/90 font-medium tracking-tight">{user.username}</p>
          </div>
        </div>

        <div className="border-b">
          <div className="md:grid md:grid-cols-[minmax(0,0.20fr)_minmax(0,1fr)] md:gap-5 space-y-2 md:space-y-0 p-4 duration-300 ease-in-out transition-colors hover:bg-secondary/55">
            <p className="text-muted-foreground font-medium">Email</p>
            <p className="text-zinc-300/90 font-medium tracking-tight">{user.email}</p>
          </div>
        </div>

        <div className="border-b">
          <div className="md:grid md:grid-cols-[minmax(0,0.20fr)_minmax(0,1fr)] md:gap-5 space-y-2 md:space-y-0 p-4 duration-300 ease-in-out transition-colors hover:bg-secondary/55">
            <p className="text-muted-foreground font-medium">Register Type</p>
            <p className="text-zinc-300/90 font-medium tracking-tight">{user.registerType}</p>
          </div>
        </div>

        <div className="border-b">
          <div className="md:grid md:grid-cols-[minmax(0,0.20fr)_minmax(0,1fr)] md:gap-5 space-y-2 md:space-y-0 p-4 duration-300 ease-in-out transition-colors hover:bg-secondary/55">
            <p className="text-muted-foreground font-medium">Roles</p>
            <div className="text-zinc-300/90 font-medium tracking-tight capitalize gap-2 flex">
              {user.roles.map(r => <RoleBadge key={r} role={roleMap[r]} />)}
            </div>
          </div>
        </div>

        <div className="border-b">
          <div className="md:grid md:grid-cols-[minmax(0,0.20fr)_minmax(0,1fr)] md:gap-5 space-y-2 md:space-y-0 p-4 duration-300 ease-in-out transition-colors hover:bg-secondary/55">
            <p className="text-muted-foreground font-medium">Member Since</p>
            <p className="text-zinc-300/90 font-medium tracking-tight">{formatFullDate(user.createdAt)}</p>
          </div>
        </div>

        <div className="border-b">
          <div className="md:grid md:grid-cols-[minmax(0,0.20fr)_minmax(0,1fr)] md:gap-5 space-y-2 md:space-y-0 p-4 duration-300 ease-in-out transition-colors hover:bg-secondary/55">
            <p className="text-muted-foreground font-medium">Last Activity</p>
            <p className="text-zinc-300/90 font-medium tracking-tight">{lastActivity}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserInfoGrid;
