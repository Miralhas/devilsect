import { Metadata } from "next";
import ProfilePage from "../page";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/profile/[username]">): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username}'s Profile`,
  }
}

export default ProfilePage;