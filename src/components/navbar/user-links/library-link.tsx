import { BookOpenText } from "lucide-react";
import Link from "next/link";

const LibraryLink = () => {
  return (
    <Link href="/account/library" className="hidden sm:flex transition-transform duration-100 ease-out transform text-foreground/80 hover:text-foreground items-center gap-2 relative group hover:scale-[1.03]">
      <BookOpenText className="size-5" />
      <span className="text-sm mb-[2px]  sr-only md:not-sr-only">Library</span>
    </Link>
  )
}

export default LibraryLink;
