'use client'

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useGetGenres } from "@/services/novels/client-queries";
import { Genre } from "@/types/novel";

type Props = {
  selectedGenres: string[];
  handleGenres: (g: Genre) => void;
}

const NovelGenres = ({ selectedGenres, handleGenres }: Props) => {
  const query = useGetGenres();

  if (query.isLoading) {
    return (
      <div className="border border-zinc-50/15 rounded-sm p-2 flex flex-wrap gap-2.5 max-h-[300px] overflow-y-auto">
        <Loading className="w-full min-h-[10vh]" />
      </div>
    )
  }

  if (query.isError) {
    return (
      <div className="border border-zinc-50/15 rounded-sm p-2 flex flex-wrap gap-2.5 max-h-[300px] overflow-y-auto">
        <p>error...</p>
      </div>
    )
  }

  return (
    <div className="border border-zinc-50/15 rounded-sm p-2 flex flex-wrap gap-1.5 gap-y-2 max-h-[300px] overflow-y-auto">
      {query.data?.map(g => {
        const isSelected = selectedGenres.some(selectedGenre => g.name === selectedGenre);
        return (
          <Button
            className="text-xs"
            variant={isSelected ? "cool" : "cool-secondary"}
            size="sm"
            type="button"
            key={g.id}
            onClick={() => handleGenres(g)}
          >
            {g.name}
          </Button>
        )
      })}
    </div>
  )
}

export default NovelGenres;
