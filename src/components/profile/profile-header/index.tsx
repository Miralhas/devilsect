import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import defaultBlur from "@/lib/blur-data";
import { mapRoles } from "@/lib/utils";
import { getCurrentUser } from "@/services/authentication/server-queries";
import { redirect } from "next/navigation";
import ProfileLinks from "../profile-links";
import ActionButtons from "../profile-links/action-buttons";
import ProfileStats from "./profile-stats";

const ProfileHeader = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <section className="w-full grid grid-rows-[max-content_max-content_min-content] md:grid-rows-[max-content_max-content] grid-cols-1 md:grid-cols-[min-content_1fr] bg-secondary/10 border border-zinc-50/10 rounded-2xl backdrop-blur-xl gap-y-4 md:gap-x-6 px-4 md:px-10 pt-4 md:pt-10">
      <div className="col-span-1 flex items-center justify-center row-start-1 row-span-1">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="rounded-full size-32 md:size-36 aspect-square overflow-hidden relative">
            <DynamicBlurImage
              src={`${env.APP_URL}/users/${user.id}/image`}
              onErrorImage="/yin-yang.png"
              unoptimized
              fill
              alt="user profile image"
              className="w-full object-cover h-full rounded-full transition-transform duration-500 group-hover:scale-105 opacity-90"
              quality={10}
              blurData={defaultBlur}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 row-start-2 md:row-start-1 row-span-1 space-y-4 grid">
        <div className="flex flex-col md:flex-row w-full justify-between items-center md:items-baseline gap-4 md:self-start">
          <div className="space-y-1  flex flex-col items-center justify-center md:items-start overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold text-white group">{user.username}</h1>
            <p className="text-center md:text-start text-muted-foreground text-base">{mapRoles(user.roles)}</p>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-4">
            <ActionButtons />
          </div>
        </div>
        <ProfileStats />
      </div>
      <div className="row-start-3 col-span-2 border-t pt-2 md:pt-4 w-full md:px-4">
        <ProfileLinks />
      </div>
    </section>
  )
}

export default ProfileHeader;
