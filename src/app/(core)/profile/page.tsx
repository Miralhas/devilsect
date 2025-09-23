import ProfileHeader from "@/components/profile/profile-header";
import ProfileLoading from "@/components/profile/profile-loading";
import UserInfoGrid from "@/components/profile/user-info-grid";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile"
};

const ProfilePage = () => {
  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <Suspense fallback={<ProfileLoading />}>
        <UserInfoGrid />
      </Suspense>
    </section>
  )
}

export default ProfilePage;
