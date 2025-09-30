'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpdateNovelInput, updateNovelSchema } from "@/lib/schemas/update-novel-schema";
import { updateNovelAction } from "@/service/dashboard/actions/update-novel-action";
import { Genre, Novel, NovelStatus, Tag } from "@/types/novel";
import { actionErrorMessage } from "@/utils/string-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useController, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import DescriptionPreviewModal from "./description-preview-modal";
import NovelGenres from "./novel-genres";
import TagsCombobox from "./tags-combobox";

const UpdateNovelForm = ({ novel }: { novel: Novel }) => {
  const action = updateNovelAction.bind(null, novel)
  const [formState, formAction, isPending] = useActionState(action, { success: undefined });

  useEffect(() => {
    if (formState.success === undefined) {
      return;
    } else if (formState.success) {
      toast.success("Novel updated successfully!");
    } else {
      toast.error("Failed to update novel!", { description: formState.errors!["error"] ?? "" });
    };
  }, [formState.success, formState.errors]);


  const form = useForm<UpdateNovelInput>({
    resolver: zodResolver(updateNovelSchema),
    defaultValues: {
      alias: novel.alias,
      author: novel.author,
      description: novel.description,
      genres: novel.genres,
      status: novel.status,
      tags: novel.tags,
      title: novel.title
    },
    mode: "onSubmit"
  });

  const { field: genresField } = useController({
    name: "genres",
    control: form.control,
  });


  const { field: tagsField } = useController({
    name: "tags",
    control: form.control,
  });

  const { errors: clientErrors, isDirty } = form.formState;

  const description = useWatch({ control: form.control, name: "description", defaultValue: novel.description});

  const onSubmit = form.handleSubmit((data: UpdateNovelInput) => {
    startTransition(() => formAction(data));
  });

  const onReset = () => {
    form.reset();
  }

  const handleGenres = (g: Genre) => {
    const isSelected = genresField.value.includes(g.name);
    if (isSelected) {
      genresField.onChange(genresField.value.filter((v: string) => v !== g.name));
    } else {
      genresField.onChange([...genresField.value, g.name]);
    }
  };

  const handleTags = (t: Tag) => {
    const isSelected = tagsField.value.includes(t.name);
    if (isSelected) {
      tagsField.onChange(tagsField.value.filter(selectedTag => selectedTag !== t.name));
    } else {
      tagsField.onChange([...tagsField.value, t.name]);
    }
  }

  const handleRemoveSelectedTag = (tagName: string) => {
    return tagsField.onChange(tagsField.value.filter(selectedTag => selectedTag !== tagName));
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="title" className="font-semibold text-muted-foreground">Title</Label>
        <Input
          id="title"
          type="text"
          defaultValue={novel.title}
          placeholder="Novel title"
          aria-invalid={Boolean(clientErrors.title) || Boolean(formState.errors?.title)}
          {...form.register("title")}
        />
        {clientErrors.title ? (
          <p className="text-red-700/80 text-sm">{clientErrors.title.message}</p>
        ) : null}
        {formState.errors?.title ? (
          <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.title)}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="alias" className="font-semibold text-muted-foreground">Alias</Label>
        <Input
          id="alias"
          type="text"
          defaultValue={novel.alias !== null ? novel.alias : undefined}
          placeholder="Novel alias"
          aria-invalid={Boolean(clientErrors.alias) || Boolean(formState.errors?.alias)}
          {...form.register("alias")}
        />
        {clientErrors.alias ? (
          <p className="text-red-700/80 text-sm">{clientErrors.alias.message}</p>
        ) : null}
        {formState.errors?.alias ? (
          <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.alias)}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="author" className="font-semibold text-muted-foreground">Author</Label>
        <Input
          id="author"
          type="text"
          defaultValue={novel.author}
          placeholder="Novel author"
          aria-invalid={Boolean(clientErrors.author) || Boolean(formState.errors?.author)}
          {...form.register("author")}
        />
        {clientErrors.author ? (
          <p className="text-red-700/80 text-sm">{clientErrors.author.message}</p>
        ) : null}
        {formState.errors?.author ? (
          <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.author)}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="status" className="font-semibold text-muted-foreground">Status</Label>
        <Select
          defaultValue={novel.status}
          onValueChange={(val: NovelStatus) => form.setValue("status", val)}
          aria-invalid={Boolean(clientErrors.status) || Boolean(formState.errors?.status)}
          {...form.register("status")}
        >
          <SelectTrigger id="status" className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ON_GOING">On Going</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>

        {clientErrors.status ? (
          <p className="text-red-700/80 text-sm">{clientErrors.status.message}</p>
        ) : null}
        {formState.errors?.status ? (
          <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.status)}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <div className="flex items-center gap-4">
          <Label htmlFor="description" className="font-semibold text-muted-foreground">Description</Label>
          {description && <DescriptionPreviewModal description={description} className="space-y-2.5" />}
        </div>
        <Textarea
          id="description"
          defaultValue={novel.description}
          placeholder="Novel description"
          aria-invalid={Boolean(clientErrors.description) || Boolean(formState.errors?.description)}
          rows={7}
          {...form.register("description")}
        />
        {clientErrors.description ? (
          <p className="text-red-700/80 text-sm">{clientErrors.description.message}</p>
        ) : null}
        {formState.errors?.description ? (
          <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.description)}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="" className="font-semibold text-muted-foreground inline-flex gap-2 items-center">Genres
          <span className="text-xs relative top-0.25 font-light">{genresField.value.length} selected</span>
        </Label>
        <NovelGenres selectedGenres={genresField.value} handleGenres={handleGenres} />
        {clientErrors.genres ? (
          <p className="text-red-700/80 text-sm">{clientErrors.genres.message}</p>
        ) : null}
        {formState.errors?.genres ? (
          <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.genres)}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="novel-tags" className="font-semibold text-muted-foreground inline-flex gap-2 items-center">Tags
          <span className="text-xs relative top-0.25 font-light">{tagsField.value.length} selected</span>
        </Label>
        <TagsCombobox handleTags={handleTags} tags={tagsField.value} handleRemoveSelectedTag={handleRemoveSelectedTag} />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="cool" type="submit" disabled={isPending || !isDirty} className="">
          {isPending ? <span className="animate-pulse">Updating...</span> : "Save Changes"}
        </Button>
        <Button variant="cool-secondary" type="reset" disabled={isPending} className="" onClick={onReset}>
          Reset
        </Button>
      </div>
    </form>
  )
}

export default UpdateNovelForm;
