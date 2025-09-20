'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateChapterInput, updateChapterSchema } from "@/lib/schemas/update-chapter-schema";
import { updateChapterAction } from "@/services/dashboard/actions";
import { Chapter } from "@/types/chapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DescriptionPreviewModal from "../dashboard-tab/novel-info/description-preview-modal";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const UpdateChapterForm = ({ chapter }: { chapter: Chapter }) => {
  const action = updateChapterAction.bind(null, chapter);
  const [formState, formAction, isPending] = useActionState(action, { success: undefined });
  const [numberDisabled, setNumberDisabled] = useState(true);

  useEffect(() => {
    if (formState.success === undefined) {
      return;
    } else if (formState.success) {
      toast.success("Novel updated successfully!");
    } else {
      toast.error("Failed to update novel!");
    };
  }, [formState.success]);


  const form = useForm<UpdateChapterInput>({
    resolver: zodResolver(updateChapterSchema),
    defaultValues: { ...chapter },
    mode: "onSubmit"
  });

  const body = form.watch("body");

  const { errors: clientErrors, isDirty } = form.formState;

  const onSubmit = form.handleSubmit((data: UpdateChapterInput) => {
    startTransition(() => formAction(data));
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
          aria-invalid={Boolean(clientErrors.title) || Boolean(formState.errors?.title)}
          {...form.register("title")}
        />
        {clientErrors.title ? (
          <p className="text-red-700/80 text-sm">{clientErrors.title.message}</p>
        ) : null}
        {formState.errors?.title ? (
          <p className="text-red-700/80 text-sm">{formState.errors.title.join(',')}</p>
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
          aria-invalid={Boolean(clientErrors.body) || Boolean(formState.errors?.body)}
          rows={7}
          {...form.register("body")}
        />
        {clientErrors.body ? (
          <p className="text-red-700/80 text-sm">{clientErrors.body.message}</p>
        ) : null}
        {formState.errors?.body ? (
          <p className="text-red-700/80 text-sm">{formState.errors.body.join(',')}</p>
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
          aria-invalid={Boolean(clientErrors.number) || Boolean(formState.errors?.number)}
          {...form.register("number")}
          disabled={numberDisabled}
        />
        {clientErrors.number ? (
          <p className="text-red-700/80 text-sm">{clientErrors.number.message}</p>
        ) : null}
        {formState.errors?.number ? (
          <p className="text-red-700/80 text-sm">{formState.errors.number.join(',')}</p>
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
