'use client'

import { quotes } from "@/app/quotes";
import { toSlug } from "@/utils/string-utils";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import NewQuote from "./new-quote";

const getRandint = (length: number) => {
  return Math.floor(Math.random() * length);
}

const ShowQuote = ({ children }: PropsWithChildren) => {
  const [randint, setRandint] = useState<number>(getRandint(quotes.length));
  const quote = quotes[randint]

  const onNewQuote = () => {
    setRandint(getRandint(quotes.length))
  }

  return (
    <>
      <Link href={`/novels/${toSlug(quote.novel)}`} className="space-y-2.5" suppressHydrationWarning>
        <p className="text-xs md:text-sm italic text-zinc-300/90 font-medium" suppressHydrationWarning>
          <span className="inline-block mr-1 text-[14px] text-zinc-200">“</span>
          {quote.quote}
          <span className="inline-block ml-0.5 text-[14px] text-zinc-200">”</span>
        </p>
        <p suppressHydrationWarning className="text-xs md:text-sm font-medium text-zinc-200">― {quote.author}, {quote.novel}</p>
      </Link>
      <div className="flex flex-col md:flex-row gap-2.5 items-center justify-center w-full mt-8">
        <NewQuote onClick={onNewQuote} className="w-full sm:max-w-[180px]" />
        {children}
      </div>
    </>
  )
}

export default ShowQuote;
