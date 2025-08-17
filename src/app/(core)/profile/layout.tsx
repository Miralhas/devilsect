import ProfileHeader from "@/components/profile/profile-header";
import BlurCenter from "@/components/ui/blur-center";
import { PropsWithChildren } from "react";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="min-h-screen w-full max-w-[1280px] mx-auto p-4 pt-8 md:pt-12 space-y-6 md:space-y-10">
      <BlurCenter opacity="low" />
      <ProfileHeader />
      <section className="w-full border border-zinc-50/10 min-h-[50vh] grid rounded-2xl bg-secondary/10">
        {children}
      </section>
    </section>
  )
}

export default ProfileLayout;
