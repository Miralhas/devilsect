'use client'

import { useReadAllUserNotifications } from "@/service/notifications/mutations/use-read-all-user-notifications";
import { PropsWithChildren, useEffect } from "react";

const ReadNotificationsWrapper = ({ children }: PropsWithChildren) => {
  const mutation = useReadAllUserNotifications();
  
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line
  }, []);

  return children;
}

export default ReadNotificationsWrapper;
