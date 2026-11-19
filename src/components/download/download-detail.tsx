import { env } from "@/env";
import useSimulatedProgressBar from "@/hooks/use-simulated-progress-bar";
import { useGetJobByIdQuery } from "@/service/download/queries/use-get-job-by-id";
import { DownloadJob } from "@/types/download-job";
import { MILLISECONDS as POLL_INTERVAL_MS } from "@/utils/constants";
import { DownloadIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ProgressBar from "./progress-bar";

type Props = {
  id: number;
  onFailedJob: (job: DownloadJob) => void;
}

const DownloadDetail = ({ id, onFailedJob }: Props) => {
  const { data: job } = useGetJobByIdQuery(id, {
    refetchInterval: ({ state }) => (
      state.data?.status === "PENDING" ? POLL_INTERVAL_MS : false
    ),
  });

  const {
    progress,
    onFinish,
    onStart,
    onStop
  } = useSimulatedProgressBar({ limit: 98, speed: 0.05 });

  const status = job?.status ?? "PENDING";

  const pending = status === "PENDING";
  const completed = status === "COMPLETED";
  const failed = status === "FAILED";

  useEffect(() => { onStart(); }, []);

  useEffect(() => {
    if (completed) {
      onFinish();
    };

    if (job && failed) {
      onStop();
      toast.error("Download failed", { description: job?.error, position: 'top-center' });
      onFailedJob(job);
    }

  }, [status, completed, failed]);

  if (failed) return null;

  return (
    <div className="space-y-1">
      <div className="flex w-full justify-between text-sm">
        <p className="text-muted-foreground">{pending ? "Processing chapters..." : "Processing complete"}</p>
        <p className="text-foreground/70">{progress.toFixed(0)}%</p>
      </div>
      <div className="grid grid-cols-[1fr_0.045fr] gap-3 items-center">
        <ProgressBar progress={progress} />
        <a href={`${env.NEXT_PUBLIC_BASE_URL}/jobs/${job?.id}/download`} className="w-full">
          <Button className="w-full group" variant="cool" size="sm" disabled={!completed}>
            <DownloadIcon className="size-3.5 text-zinc-300 group-hover:text-foreground" />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default DownloadDetail;
