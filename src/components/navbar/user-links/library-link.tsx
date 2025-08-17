import { BookOpenText } from "lucide-react";
import Link from "next/link";

const LibraryLink = () => {
  return (
    <Link href="/profile/library" className="hidden sm:flex transition-all duration-200 ease-out text-foreground/80 hover:text-foreground items-center gap-2">
      <BookOpenText className="size-5" />
      <span className="text-sm sr-only md:not-sr-only">Library</span>
    </Link>
  )
}

export default LibraryLink;
