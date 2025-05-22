import AuthenticationInput from "@/components/ui/authentication-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SendResetPasswordInput } from "@/lib/schemas/reset-password";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type SendEmailFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<SendResetPasswordInput>;
  clientErrors: FieldErrors<SendResetPasswordInput>;
  actionErrors?: Record<string, string[]>;
  isPending: boolean;
};

const SendEmailForm = ({ actionErrors, clientErrors, onSubmit, register, isPending }: SendEmailFormProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-accent-foreground text-center mb-5">Reset Password</h1>
      <div className="w-full space-y-4">
        <p className="text-muted-foreground text-sm leading-5 tracking-wide font-normal font-roboto">
          Enter your email address and we&apos;ll send you a verification code to reset your password.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-muted-foreground">Email</Label>
            <AuthenticationInput
              id="email"
              placeholder="example@email.com"
              disabled={isPending}
              aria-invalid={Boolean(clientErrors.email) || Boolean(actionErrors?.email)}
              {...register("email")}
            />
            {clientErrors.email ? (
              <p className="text-red-700/80 text-sm">{clientErrors.email.message}</p>
            ) : null}
            {actionErrors?.email ? (
              <p className="text-red-700/80 text-sm">{actionErrors.email.join(',')}</p>
            ) : null}
          </div>
          <div className="grid">
            <Button variant="cool">
              {isPending ? <span className="animate-pulse">Sending...</span> : "Send Verification Code"}
            </Button>
          </div>
        </form>
        <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed">
          Remember your password? <Link href="/signup" className="transition-colors duration-200 hover:text-red-800 underline">Sign in</Link>
        </div>
      </div>
    </>
  )
}

export default SendEmailForm;
