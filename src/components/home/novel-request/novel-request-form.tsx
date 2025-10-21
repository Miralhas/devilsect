'use client'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import { NovelRequestInput, novelRequestSchema } from "@/lib/schemas/novel-request";
import { useSendNovelRequest } from "@/service/requests/mutations/use-send-novel-request";
import { useCurrentUser } from "@/service/user/queries/use-get-current-user";
import { ONE_DAY_IN_SECONDS } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { hasCookie, setCookie } from 'cookies-next/client';
import { SendIcon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const COOKIE_NAME = "novel_request_timer";

const NovelRequestForm = () => {
  const query = useCurrentUser();
  const { handleOpen } = useGlobalLoginContext();
  const mutation = useSendNovelRequest();
  const isAuthenticated = !!query.data;

  const alreadySentRequestToday = hasCookie(COOKIE_NAME);

  const form = useForm<NovelRequestInput>({
    resolver: zodResolver(novelRequestSchema),
    defaultValues: {
      novelTitle: "",
    },
  });

  const { isDirty } = form.formState;

  const handleSetCookie = useCallback(() => {
    return setCookie(COOKIE_NAME, undefined, {
      maxAge: ONE_DAY_IN_SECONDS,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })
  }, []);


  function onSubmit({ novelTitle }: NovelRequestInput) {
    if (!isAuthenticated) {
      handleOpen();
      return;
    }

    mutation.mutate(novelTitle, {
      onSuccess: () => {
        toast.success("Rating Saved", { position: "top-center", description: "Novel request sent successfully!." });
        handleSetCookie();
      },
      onError: () => {
        toast.error("Rating Failed", { position: "top-center", description: "Failed to send novel request. Please try again later." });
      },
    })

  }

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {alreadySentRequestToday && (
          <p className="text-red-900 tracking-tight font-semibold text-xs md:text-[13px] mb-2">You can send only one novel request per day.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0px,1fr)_180px] gap-1.5 w-full">
          <FormField
            control={form.control}
            name="novelTitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="col-span-1 h-11 placeholder:text-sm aria-invalid:border-red-800"
                    placeholder="Enter novel title..." {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-800" />
              </FormItem>
            )}
          />
          <Button variant="cool" className="col-span-1 h-11" disabled={!isDirty || mutation.isPending || alreadySentRequestToday} type="submit">
            <SendIcon className="size-4.5" />
            {mutation.isPending ? <span className="animate-pulse">Sending request...</span> : "Send Request"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NovelRequestForm;
