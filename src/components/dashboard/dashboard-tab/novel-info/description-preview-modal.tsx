import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";


type Props = {
  className?: string;
  description: string;
}

const DescriptionPreviewModal = ({ className, description }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs px-2 py-0.5" variant="cool" size="none" type="button">Preview</Button>
      </DialogTrigger>
      <DialogContent className="pt-10">
        <DialogHeader className="">
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            Description preview
          </DialogDescription>
        </DialogHeader>
        <div className={cn("overflow-y-auto max-h-[500px]", className)} dangerouslySetInnerHTML={{ __html: description }}>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DescriptionPreviewModal;
