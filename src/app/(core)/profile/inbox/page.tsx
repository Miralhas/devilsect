import InboxPageHeader from "@/components/profile/inbox/inbox-page-header";
import Notifications from "@/components/profile/inbox/notifications";
import ReadNotificationsWrapper from "@/components/profile/inbox/read-notifications-wrapper";
import ProfileHeader from "@/components/profile/profile-header";
import { getUserNotifications } from "@/service/notifications/api/get-user-notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Inbox"
};

const InboxPage = async () => {
  const notifications = await getUserNotifications();
  return (
    <ReadNotificationsWrapper>
      <section className="p-4 md:p-10 space-y-12">
        <ProfileHeader />
        <div className="space-y-6">
          <InboxPageHeader />
          <Notifications notifications={notifications} />
        </div>
      </section>
    </ReadNotificationsWrapper>
  )
}

export default InboxPage;