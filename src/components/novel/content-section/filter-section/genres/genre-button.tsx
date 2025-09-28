import { Button } from "@/components/ui/button";
import { nuqsNovelSummariesParams } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { Genre } from "@/types/novel";
import { XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

const GenreButton = ({ genre }: { genre: Genre }) => {
  const [values, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const isSelected = values.genres.some(g => g.toLowerCase() === genre.name.toLowerCase());

  const onClick = () => {
    if (isSelected) {
      setValues({ genres: values.genres.filter(g => g.toLowerCase() !== genre.name.toLowerCase()) })
      return;
    }
    setValues({ genres: [...values.genres, genre.name.toLowerCase()] })
  }

  return (
    <Button variant={isSelected ? "extra-cool" : "extra-cool-secondary"} className="border p-2 rounded-md text-sm flex items-center justify-center relative text-center" onClick={onClick}>
      <span>{genre.name}</span>
      {isSelected ? <XIcon className="size-3 absolute right-1 top-1" /> : null}
    </Button>
  )
}

export default GenreButton;
