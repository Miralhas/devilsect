import Link from "next/link";
import { Badge } from "../ui/badge";

const NovelBadge = ({ name }: { name: string }) => {
  return (
    <Badge asChild variant='secondary' className="rounded-sm text-sm text-zinc-200">
      <Link href="/">{name}</Link>
    </Badge>
  )
}

export default NovelBadge;
