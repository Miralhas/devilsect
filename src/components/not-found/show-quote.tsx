'use client'

import { quotes } from "@/app/quotes";
import { toSlug } from "@/utils/string-utils";
import Link from "next/link";
import { useState } from "react";
import HomePageButton from "./home-page-button";
import NewQuote from "./new-quote";

const getRandint = (length: number) => {
  return Math.floor(Math.random() * length);
}

const ShowQuote = () => {
  const [randint, setRandint] = useState<number>(() => getRandint(quotes.length));
  const quote = quotes[randint]

  const onNewQuote = () => {
    setRandint(getRandint(quotes.length))
  }

  return (
    <>
      <Link href={`/novels/${toSlug(quote.novel)}`} className="space-y-2.5">
        <p className="text-xs md:text-sm italic text-zinc-300/90 font-medium">
          <span className="inline-block mr-1 text-[14px] text-zinc-200">“</span>
          {quote.quote}
          <span className="inline-block ml-0.5 text-[14px] text-zinc-200">”</span>
        </p>
        <p className="text-xs md:text-sm font-medium text-zinc-200">― {quote.author}, {quote.novel}</p>
      </Link>
      <div className="flex flex-col md:flex-row gap-2.5 items-center justify-center w-full mt-8">
        <NewQuote onClick={onNewQuote} className="w-full sm:max-w-[180px]" />
        <HomePageButton className="w-full sm:max-w-[180px]" />
      </div>
    </>
  )
}

export default ShowQuote;
