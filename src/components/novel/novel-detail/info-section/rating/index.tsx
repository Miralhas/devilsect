'use client'

import { useCurrentUser } from "@/service/authentication/queries/use-get-current-user";
import { Novel } from "@/types/novel";
import ClientRating from "./client-rating";

const NovelRating = ({ novel }: { novel: Novel }) => {
  const { data: user } = useCurrentUser();
  return <ClientRating novel={novel} user={user} />
}

export default NovelRating;
