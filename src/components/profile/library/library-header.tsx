'use client'

import { DynamicProfileData } from "@/types/authentication";
import { BookmarkPlus, FlagIcon, LibraryIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

const LibraryHeader = ({ profile }: { profile: DynamicProfileData }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const id = setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 250);

    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={divRef}>
      <div className="flex items-center gap-2 w-full mb-1">
        <div className="size-10 bg-primary/50 text-accent flex items-center justify-center border border-accent/70 rounded-md">
          <LibraryIcon className="size-6" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">{profile.readOnly ? `${profile.user.username}'s` : 'Your'} Library</h2>
      </div>
      <p className="text-sm text-muted-foreground ">
        {profile.readOnly ? profile.user.username : 'Your'} personal collection of novels.
      </p>
      {!profile.readOnly && <div className="w-full bg-secondary/40 mt-4 p-4 space-y-2 border">
        <p className="text-muted-foreground text-sm">
          <BookmarkPlus className="size-3.5 inline-block mr-1" fill="" />
          Bookmark your favorite novels.
        </p>
        <p className="text-muted-foreground text-sm">
          <FlagIcon className="size-3.5 inline-block mr-1" fill="#9f9fa9" />
          Mark a novel as Complete once you’ve finished reading.
        </p>
      </div>}
    </div>
  )
}

export default LibraryHeader;
