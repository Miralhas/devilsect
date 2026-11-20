import { Metadata } from "next";
import LibraryPage from "../../library/page";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/profile/[username]">): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username}'s Library`,
  }
}

export default LibraryPage;