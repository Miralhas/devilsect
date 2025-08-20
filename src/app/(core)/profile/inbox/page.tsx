import ProfileHeader from "@/components/profile/profile-header";
import { InboxIcon } from "lucide-react";

const InboxPage = async () => {
  return (
    <section className="p-4 md:p-10 space-y-6 md:space-y-12">
      <ProfileHeader />
      <div className="h-64 flex border flex-col items-center justify-center gap-2 text-muted-foreground">
        <div className="p-5 rounded-full bg-secondary justify-self-center border border-zinc-50/10">
          <InboxIcon className="size-6.5" />
        </div>
        <p className="text-sm md:text-base">No new notifications.</p>
      </div>
    </section>
  )
}

export default InboxPage;
