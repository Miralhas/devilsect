'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UpdateChapterInput, updateChapterSchema } from "@/lib/schemas/update-chapter-schema";
import { purgeNovelCache } from "@/service/actions";
import { useUpdateChapter } from "@/service/dashboard/mutations/use-update-chapter";
import { Chapter } from "@/types/chapter";
import { isApiError } from "@/utils/common-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import DescriptionPreviewModal from "../dashboard-tab/novel-info/description-preview-modal";

const UpdateChapterForm = ({ chapter }: { chapter: Chapter }) => {
  const [numberDisabled, setNumberDisabled] = useState(true);
  const { mutate, isPending } = useUpdateChapter();

  const form = useForm<UpdateChapterInput>({
    resolver: zodResolver(updateChapterSchema),
    defaultValues: { ...chapter },
    mode: "onSubmit"
  });

  const body = useWatch({ control: form.control, name: "body", defaultValue: chapter.body });

  const { errors, isDirty } = form.formState;

  const onSubmit = form.handleSubmit((input: UpdateChapterInput) => {
    mutate({ chapter, input }, {
      onSuccess: () => {
        toast.success("Chapter updated successfully!");
        return purgeNovelCache(chapter.novelSlug);
      },
      onError: (error) => toast.error("Failed to update chapter!", {
        description: isApiError(error) ? error.detail : error.message
      }),
    })
  });

  const onReset = () => {
    form.reset();
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="title" className="font-semibold text-muted-foreground">Title</Label>
        <Input
          id="title"
          type="text"
          defaultValue={chapter.title}
          placeholder="Chapter title"
          aria-invalid={Boolean(errors.title)}
          {...form.register("title")}
        />
        {errors.title ? (
          <p className="text-red-700/80 text-sm">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <div className="flex items-center gap-4">
          <Label htmlFor="description" className="font-semibold text-muted-foreground">Body</Label>
          {body && <DescriptionPreviewModal description={body} className="space-y-4" />}
        </div>
        <Textarea
          id="description"
          defaultValue={chapter.body}
          placeholder="Chapter body"
          aria-invalid={Boolean(errors.body)}
          rows={7}
          {...form.register("body")}
        />
        {errors.body ? (
          <p className="text-red-700/80 text-sm">{errors.body.message}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <div className="flex gap-2 items-center justify-between">
          <Label htmlFor="number" className="font-semibold text-muted-foreground">Number</Label>
          <div className="flex items-start gap-2">
            <Label htmlFor="disabled" className="font-semibold text-muted-foreground">Disable?</Label>
            <Checkbox className="" checked={numberDisabled} onCheckedChange={() => setNumberDisabled(prev => !prev)} id="disabled" />
          </div>
        </div>
        <Input
          id="number"
          type="number"
          defaultValue={chapter.number}
          placeholder="Chapter number"
          aria-invalid={Boolean(errors.number)}
          onChange={(e) => form.setValue("number", e.target.valueAsNumber, { shouldDirty: true })}
          disabled={numberDisabled}
        />
        {errors.number ? (
          <p className="text-red-700/80 text-sm">{errors.number.message}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="cool" type="submit" disabled={isPending || !isDirty} className="">
          {isPending ? <span className="animate-pulse">Updating...</span> : "Save Changes"}
        </Button>
        <Button variant="cool-secondary" type="reset" disabled={isPending} onClick={onReset}>
          Reset
        </Button>
      </div>
    </form>
  )
}

export default UpdateChapterForm;
