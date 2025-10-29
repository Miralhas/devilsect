'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useController, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useSendFixChapterRequest } from "@/service/requests/mutations/use-send-fix-chapter-request"
import { useGlobalLoginContext } from "@/contexts/global-login-context"
import { useCurrentUser } from "@/service/user/queries/use-get-current-user"
import { useParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import { hasCookie, setCookie } from "cookies-next/client"
import { ONE_DAY_IN_SECONDS } from "@/utils/constants"

const FIX_CHAPTER_ERRORS = [
  {
    slug: "missing-content",
    name: "Missing Content",
    description: "Chapter abruptly cuts off or sections are omitted"
  },
  {
    slug: "out-of-sequence",
    name: "Out of Sequence",
    description: "Chapter number or order does not follow the previous chapter"
  },
  {
    slug: "duplicate-chapter",
    name: "Duplicate Chapter",
    description: "Exact or near-exact repeat of an earlier chapter"
  },
  {
    slug: "incorrect-translation",
    name: "Incorrect Translation",
    description: "Meaning changed, mistranslated lines, or unreadable phrasing"
  },
  {
    slug: "wrong-novel",
    name: "Wrong Novel",
    description: "Chapter content belongs to a different novel"
  },
  {
    slug: "formatting-problems",
    name: "Formatting Problems",
    description: "Broken paragraphs, missing line breaks, or encoding issues"
  },
]

const chapterErrorRequestSchema = z.object({
  chapterErrors: z.array(z.string()).min(1, { message: "Select at least one error" })
});

export type ChapterErrorRequestInput = z.infer<typeof chapterErrorRequestSchema>;

const ChapterErrorForm = ({ handleClose }: { handleClose: () => void; }) => {
  const { slug, chapterSlug } = useParams<{ slug: string, chapterSlug: string }>();
  const query = useCurrentUser();
  const isAuthenticated = !!query.data;
  const { handleOpen } = useGlobalLoginContext();
  const mutation = useSendFixChapterRequest();

  const COOKIE_NAME = useMemo(() => {
    return `${chapterSlug}_fix_chapter_request_timer`
  }, [chapterSlug]);

  const alreadySentRequestToday = hasCookie(COOKIE_NAME);

  const handleSetCookie = useCallback(() => {
    return setCookie(COOKIE_NAME, undefined, {
      maxAge: ONE_DAY_IN_SECONDS,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })
  }, [COOKIE_NAME]);

  const form = useForm<ChapterErrorRequestInput>({
    resolver: zodResolver(chapterErrorRequestSchema),
    defaultValues: {
      chapterErrors: []
    },
  });

  const { isDirty, errors: formErrors } = form.formState;

  const { field: errorsField } = useController({
    name: "chapterErrors",
    control: form.control,
  });

  const handleErrors = (error: string) => {
    const isSelected = errorsField.value.includes(error);
    if (isSelected) {
      errorsField.onChange(errorsField.value.filter((v: string) => v !== error));
    } else {
      errorsField.onChange([...errorsField.value, error]);
    }
  };

  const onSubmit = ({ chapterErrors }: ChapterErrorRequestInput) => {
    if (!isAuthenticated) {
      handleOpen();
      return;
    }

    mutation.mutate({ novelSlug: slug, chapterSlug, errors: chapterErrors }, {
      onSuccess: () => {
        toast.success("Bug request sent successfully!", { position: "top-center" });
        handleSetCookie();
        handleClose();
      },
      onError: () => {
        toast.error("Request Failed", { position: "top-center", description: "Failed to send bug request. Please try again later." });
      },
    })
  }


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
      {formErrors.chapterErrors ? (
        <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Error sending bug fix</AlertTitle>
          <AlertDescription className="font-light tracking-wider">
            {formErrors.chapterErrors?.message}.
          </AlertDescription>
        </Alert>
      ) : null}
      <div className="w-full grid grid-cols-1 gap-4.5">
        {FIX_CHAPTER_ERRORS.map(({ description, name, slug }) => (
          <ErrorCheckbox
            slug={slug}
            key={slug}
            description={description}
            title={name}
            handleChecked={() => handleErrors(slug)}
          />
        ))}
      </div>
      {alreadySentRequestToday && (
        <p className="text-red-900 tracking-tight font-semibold text-xs md:text-[13px] mb-2">Bug request already sent for this chapter. Try again tomorrow!</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="submit"
          disabled={mutation.isPending || alreadySentRequestToday || !isDirty}
          className="w-full h-10"
          variant="gradient"
        >
          {mutation.isPending ? <span className="animate-pulse">Submitting...</span> : "Submit"}
        </Button>
        <Button type="button" onClick={handleClose} className="w-full h-10" variant="cool-secondary">Close</Button>
      </div>
    </form>
  )
}

type ErrorCheckboxProps = {
  title: string;
  description: string;
  slug: string;
  handleChecked: () => void;
}

const ErrorCheckbox = ({ title, description, handleChecked, slug }: ErrorCheckboxProps) => {
  return (
    <div className="flex gap-1.5 items-center">
      <Checkbox
        id={slug}
        className="rounded-sm size-5 border border-primary bg-primary/30 mb-1.5"
        onCheckedChange={handleChecked}
      />
      <Label htmlFor={slug} className="font-medium text-zinc-200 inline">
        {title} - <span className="text-zinc-300 font-normal text-xs text-[13px] inline">{description}</span>
      </Label>
    </div>
  )
}

export default ChapterErrorForm;
