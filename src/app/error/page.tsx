'use client'

import { useRouter } from "next/navigation";
import NextError from 'next/error';

const Error = () => {
  const router = useRouter()
  return (
    <div role="button" onClick={() => router.push("/")} className="cursor-pointer">
      <NextError statusCode={500} title="Something Went Wrong" />
    </div>
  )
}

export default Error;
