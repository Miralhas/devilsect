import { env } from "@/env";
import defaultBlur from "@/lib/blur-data";
import { getCurrentUser } from "@/services/authentication/server-queries";
import { redirect } from "next/navigation";
import DynamicBlurImage from "../dynamic-blur-image";
import ProfileLinks from "./profile-links";

const ProfileHeader = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <section className="w-full grid grid-rows-[max-content_max-content_min-content] md:grid-rows-[max-content_max-content] grid-cols-1 md:grid-cols-[min-content_1fr] bg-secondary/10 border border-zinc-50/10 rounded-2xl backdrop-blur-xl gap-y-4 md:gap-x-4 px-4 md:px-10 pt-4 md:pt-10">
      <div className="col-span-1 flex items-center justify-center row-start-1 row-span-1">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent/40 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"/>
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
      <div className="col-span-1 row-start-2 md:row-start-1 row-span-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe fugit quasi excepturi, corrupti exercitationem recusandae fuga earum repellat officia, labore nobis nemo harum sint animi amet at unde perspiciatis!</div>
      <div className="row-start-3 col-span-2 border-t py-4 px-4">
        <ProfileLinks />
      </div>
    </section>
  )
}

export default ProfileHeader;
