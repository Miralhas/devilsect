"use client";

import LogoImage from "@/components/logo-image";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset, error }: Props) {

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="h-[calc(100vh-70px)] w-full grid place-items-center p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex justify-between items-center flex-col text-center gap-2">
          <Link href="/" className="hover:opacity-70 transition-opacity duration-200 ease-in-out">
            <LogoImage height={60} width={40} />
          </Link>
          <h2 className="font-medium">Something went wrong</h2>
          <p className="text-sm text-[#878787] max-w-sm">
            An unexpected error has occurred. Please try again
            or contact administrators if the issue persists.
          </p>
        </div>

        <div className="flex space-x-4">
          <Button onClick={() => reset()} variant="cool-secondary">
            Try again
          </Button>

          <Button
            variant="cool"
            onClick={() => window.location.assign(window.location.origin)}
          >
            Home Page
          </Button>
        </div>
      </div>
    </div>
  );
}