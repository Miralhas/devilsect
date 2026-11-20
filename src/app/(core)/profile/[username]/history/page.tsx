import { Metadata } from "next";
import HistoryPage from "../../history/page";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/profile/[username]">): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username}'s History`,
  }
}

export default HistoryPage;