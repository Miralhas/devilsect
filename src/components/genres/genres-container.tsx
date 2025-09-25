'use client'

import { Genre } from "@/types/novel";
import { SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import GenreCard from "./genre-card";

const GenresContainer = ({ genres, slugs }: { genres: Genre[]; slugs: string[] }) => {
  const [filter, setFilter] = useState("");
  const filteredGenres = genres.filter(g => g.name.trim().toLowerCase().includes(filter.toLowerCase().trim()));

  return (
    <section className="space-y-3">
      <div className="relative ml-auto w-full md:w-max">
        <SearchIcon className="absolute top-2.5 left-2.25 size-4 text-muted-foreground" />
        <Input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter genres..."
          className="w-full md:max-w-sm placeholder:text-sm placeholder:text-[13px] pl-7"
        />
        {filter ? (
          <Button variant="pure" size="icon" className="absolute rounded-full right-0.5 top-0 text-muted-foreground hover:text-inherit transition-colors ease-in-out duration-200 cursor-pointer" onClick={() => setFilter("")} >
            <XIcon className="size-3.5" />
          </Button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-3">
        {filteredGenres.map(genre => {
          return (
            <Link key={genre.id} href={`/genres/${genre.name.toLowerCase()}`}>
              <GenreCard genre={genre} slugs={slugs} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default GenresContainer;
