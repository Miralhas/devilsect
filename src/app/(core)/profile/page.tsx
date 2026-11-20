import ProfileHeader from "@/components/profile/profile-header";
import ProfileLoading from "@/components/profile/profile-loading";
import UserInfoGrid from "@/components/profile/user-info-grid";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Your Profile"
};

export const instant = false;

const ProfilePage = async (props: PageProps<"/profile/[username]">) => {
  const { username } = await props.params;

  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader username={username} />
      <Suspense fallback={<ProfileLoading />}>
        <UserInfoGrid username={username} />
      </Suspense>
    </section>
  )
}

export default ProfilePage;
