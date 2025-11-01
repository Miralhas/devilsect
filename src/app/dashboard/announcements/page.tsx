import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const AnnouncementsPage = () => {
  return (
    <section className="space-y-4">
      <div className="w-full flex items-center justify-center mt-4">
        <Button asChild variant="cool" className="max-w-sm h-10">
          <Link href="/dashboard/announcements/new" className="items-center w-full"><PlusCircleIcon className="size-4" /> Create Announcement</Link>
        </Button>
      </div>
    </section>
  )
}

export default AnnouncementsPage;
