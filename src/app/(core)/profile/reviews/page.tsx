import { StarIcon } from "lucide-react";

const ReviewsPage = () => {
  return (
    <section className="">
      <div className="h-64 flex border flex-col items-center justify-center gap-2 text-muted-foreground">
        <div className="p-5 rounded-full bg-secondary justify-self-center border border-zinc-50/10">
          <StarIcon className="size-6.5" />
        </div>
        <p className="text-sm md:text-base">No reviews have been written.</p>
      </div>
    </section>
  )
}

export default ReviewsPage;
