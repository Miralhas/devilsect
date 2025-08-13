import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const NovelGenre = ({ name }: { name: string }) => {
  return (
    <Badge asChild variant='default' className="rounded-sm text-sm">
      <Link href="/">{name}</Link>
    </Badge>
  )
}

export default NovelGenre;
