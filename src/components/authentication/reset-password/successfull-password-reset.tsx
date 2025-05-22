'use client'

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const SuccessFullPasswordReset = () => {
  useEffect(() => {
    toast.success("Successfull Password Reset",
      { description: "Your password has been reset succesfully" }
    );
  }, []);

  return (
    <div className="w-full space-y-8 mt-6 font-roboto pb-4">
      <h1 className="text-2xl font-bold tracking-tight text-accent-foreground text-center">Password Reset Successfull</h1>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <div className="rounded-full border-2 border-green-500 bg-green-500/10 p-8">
          <Check className="size-10 text-green-500" />
        </div>
        <h2 className="text-xl text-green-500 font-semibold tracking-wide">Success</h2>
      </div>
      <p className="text-muted-foreground text-center">
        Your password has been reset succesfully.
      </p>
      <Button asChild variant="cool-secondary" className="w-full">
        <Link href="/login">Login Page</Link>
      </Button>
    </div>
  )
}

export default SuccessFullPasswordReset;
