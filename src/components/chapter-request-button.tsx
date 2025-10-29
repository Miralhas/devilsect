'use client'

import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import { useCallback, useMemo } from "react";
import { hasCookie, setCookie } from "cookies-next/client";
import { ONE_DAY_IN_SECONDS } from "@/utils/constants";
import { useCurrentUser } from "@/service/user/queries/use-get-current-user";
import { useSendChapterRequest } from "@/service/requests/mutations/use-send-chapter-request";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const ChapterRequestButton = () => {
  const { slug } = useParams<{ slug: string }>()
  const query = useCurrentUser();
  const isAuthenticated = !!query.data;
  const { handleOpen } = useGlobalLoginContext();
  const mutation = useSendChapterRequest();

  const COOKIE_NAME = useMemo(() => {
    return `${slug}_chapter_request_timer`
  }, [slug]);

  const alreadySentRequestToday = hasCookie(COOKIE_NAME);

  const handleSetCookie = useCallback(() => {
    return setCookie(COOKIE_NAME, undefined, {
      maxAge: ONE_DAY_IN_SECONDS,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })
  }, [COOKIE_NAME]);


  const onSubmit = () => {
    if (!isAuthenticated) {
      handleOpen();
      return;
    }

    mutation.mutate(slug, {
      onSuccess: () => {
        toast.success("Chapter request sent successfully!", { position: "top-center" });
        handleSetCookie();
      },
      onError: () => {
        toast.error("Request Failed", { position: "top-center", description: "Failed to send chapter request. Please try again later." });
      },
    })
  }
  return (
    <>
      {alreadySentRequestToday && (
        <p className="text-red-900 tracking-tight font-semibold text-xs md:text-[13px] mb-2 text-center">You can only submit one chapter request per day for this novel.</p>
      )}
      <Button variant="cool" className="h-11 w-full max-w-lg"
        disabled={mutation.isPending || alreadySentRequestToday}
        onClick={onSubmit}
        type="submit"
      >
        <SendIcon className="size-4.5" />
        {mutation.isPending ? <span className="animate-pulse">Sending request...</span> : "Send Request"}
      </Button>
    </>
  )
}

export default ChapterRequestButton;
