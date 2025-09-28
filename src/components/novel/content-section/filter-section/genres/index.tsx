import { Label } from "@/components/ui/label";
import { FrownIcon, LibraryIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import GenreButton from "./genre-button";
import SkeletonLoader from "./skeleton-loader";
import { useQueryStates } from "nuqs";
import { nuqsNovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";
import { Button } from "@/components/ui/button";
import { useGetGenres } from "@/service/info/queries/use-get-genres";

const Genres = () => {
  const query = useGetGenres();

  if (query.isLoading) {
    return (
      <Layout>
        <SkeletonLoader />
      </Layout>
    )
  }

  if (query.error) {
    return (
      <Layout>
        <div className="grid h-[50%] place-items-center">
          <div className="space-y-2 text-center flex flex-col items-center">
            <FrownIcon className="size-6 text-accent" />
            <p className="text-xs">An unexpected error occured...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-3">
        {query.data?.map(g => (
          <GenreButton key={g.id} genre={g} />
        ))}
      </div>
    </Layout>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const onClear = () => {
    setValues({ genres: [] });
  }

  const isDefaultSelected = values.genres.length <= 0;

  return (
    <div className="bg-secondary/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors space-y-3 overflow-y-auto max-h-[254px] custom-scrollbar">
      <div className="flex items-center justify-between">
        <Label className="inline-flex items-start">
          <LibraryIcon className="size-4 text-red-700" strokeWidth={3} />
          Genres
        </Label>
        {!isDefaultSelected ? <Button variant="link" size="none" className="text-sm text-accent" onClick={onClear}>Clear</Button> : null}
      </div>
      {children}
    </div>
  )
}

export default Genres;
