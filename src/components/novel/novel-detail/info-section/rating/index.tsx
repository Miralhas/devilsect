'use client'

import { useCurrentUserQuery } from "@/services/authentication/client-queries";
import { Novel } from "@/types/novel";
import ClientRating from "./client-rating";

const NovelRating = ({ novel }: { novel: Novel }) => {
  const { data: user } = useCurrentUserQuery();
  return <ClientRating novel={novel} user={user} />
}

export default NovelRating;
