import { getShallowUser } from "@/services/authentication/server-queries";
import { Novel } from "@/types/novel";
import ClientRating from "./client-rating";

const NovelRating = async ({ novel }: { novel: Novel }) => {
  const user = await getShallowUser();
  return <ClientRating novel={novel} user={user} />
}

export default NovelRating;
