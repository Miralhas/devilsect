import DownloadDetail from "@/components/download/download-detail";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadDownloadJobInput, uploadDownloadJobSchema } from "@/lib/schemas/upload-job-schema";
import { useUploadJobMutation } from "@/service/download/mutations/use-upload-job-mutation";
import { DownloadJob } from "@/types/download-job";
import { Novel } from "@/types/novel";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import ChaptersToDownload from "./chapters-to-download";
import { isApiError } from "@/utils/common-utils";
import { toast } from "sonner";

const DownloadTab = ({ novel }: { novel: Novel }) => {
  const [jobId, setJobId] = useState<DownloadJob["id"] | null>(null);
  const mutation = useUploadJobMutation();

  const defaultValues = useMemo(() => ({
    slug: novel.slug,
    start: novel.firstChapter.number,
    end: novel.lastChapter.number,
    exclude: [],
  } as UploadDownloadJobInput), [novel]);

  const form = useForm<UploadDownloadJobInput>({
    defaultValues,
    resolver: zodResolver(uploadDownloadJobSchema),
    mode: "onSubmit",
  });

  const start = useWatch({
    control: form.control,
    name: "start",
  });

  const end = useWatch({
    control: form.control,
    name: "end",
  });

  const excluded = useWatch({
    control: form.control,
    name: "exclude",
  });

  const handleChange = (num: number) => {
    const { start, end, exclude = [] } = form.getValues();
    if (num < start || num > end) {
      form.setValue(num < start ? "start" : "end", num);
      form.setValue("exclude", exclude.filter(n => n !== num));
      return;
    }
    form.setValue(
      "exclude",
      exclude.includes(num) ? exclude.filter(n => n !== num) : [...exclude, num],
      { shouldDirty: true },
    );
  }

  const handleFirstChapter = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (isNaN(value)) return;
    if (value < novel.firstChapter.number || value > novel.lastChapter.number) {
      return form.setValue('start', novel.firstChapter.number)
    };
    form.setValue('start', value);
  }

  const handleLastChapter = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    if (isNaN(value)) return;
    if (value > novel.lastChapter.number || value < novel.firstChapter.number) {
      return form.setValue('end', novel.lastChapter.number);
    }
    form.setValue('end', value);
  }

  const onSubmit = (input: UploadDownloadJobInput) => {
    mutation.mutate(input, {
      onSuccess: (j) => setJobId(j.id),
      onError: (error) => {
        const message = isApiError(error) ? error.detail : error.message
        form.setError('root', { message })
        if (isApiError(error) && error.errors) {
          Object.entries(error.errors).map(([key, value]) => {
            form.setError(
              key as keyof UploadDownloadJobInput,
              {
                type: error.status.toString(),
                message: value,
              });
          });
        }
        toast.error("Failed to download novel! Try again later", { description: message });
      },
    });
  }

  const onReset = () => {
    form.reset();
    setJobId(null);
  };

  const onFailedJob = (job: DownloadJob) => {
    form.setError('root', { message: job.error ?? "Failed to download novel" })
  }

  return (
    <section className="max-w-[1024px] mx-auto space-y-4">
      {form.formState.errors.root ? (
        <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700 mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Download error</AlertTitle>
          <AlertDescription className="font-light tracking-wider">
            {form.formState.errors.root.message}.
          </AlertDescription>
        </Alert>
      ) : null}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="md:flex space-y-2 justify-between items-center">
          <div className="grid grid-cols-2 gap-2 w-full md:max-w-[320px]">
            <Controller
              name="start"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <label htmlFor={field.name} className="text-foreground/70 text-xs text-[13px]">Start: </label>
                  <Input
                    {...field}
                    id={field.name}
                    type="numeric"
                    onChange={handleFirstChapter}
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                    disabled={!!jobId}
                  />
                </div>
              )}
            />
            <Controller
              name="end"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <label htmlFor={field.name} className="text-foreground/70 text-xs text-[13px]">End: </label>
                  <Input
                    {...field}
                    id={field.name}
                    onChange={handleLastChapter}
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                    disabled={!!jobId}
                  />
                </div>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:block md:space-x-2 gap-2">
            <Button type="submit" variant="cool" disabled={!!jobId}>Start Download</Button>
            <Button
              type="button"
              onClick={onReset}
              variant="cool-secondary"
              className="row-start-1"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
      {jobId && <DownloadDetail id={jobId} onFailedJob={onFailedJob} />}
      <ChaptersToDownload
        novel={novel}
        start={start}
        excluded={excluded ?? []}
        end={end}
        handleChange={handleChange}
        disabled={!!jobId}
      />
    </section>
  )
}

export default DownloadTab;
