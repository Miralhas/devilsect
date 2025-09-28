'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AuthenticationInput from "@/components/ui/authentication-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResetPasswordTokenInput } from "@/lib/schemas/reset-password";
import { AuthenticationFormState } from "@/types/action-state";
import { actionErrorMessage } from "@/utils/string-utils";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ResetPasswordFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<ResetPasswordTokenInput>;
  clientErrors: FieldErrors<ResetPasswordTokenInput>;
  actionErrors?: AuthenticationFormState["errors"];
  isPending: boolean;
  email: string;
};

const ResetPasswordForm = ({ clientErrors, isPending, onSubmit, register, actionErrors, email }: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-accent-foreground text-center mb-6 mt-5">Enter Verification Token</h1>
      <div className="w-full space-y-4">
        <p className="text-muted-foreground text-sm leading-5 tracking-wide font-normal font-roboto">
          We&apos;ve sent a verification code to {email} Please enter the code below along with your new password.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          {actionErrors?.error ? (
            <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-semibold mb-1">Error Reseting Password</AlertTitle>
              <AlertDescription className="font-light tracking-wider">
                {actionErrors.error}
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="grid gap-3">
            <Label htmlFor="token" className="text-muted-foreground">Verification Token</Label>
            <AuthenticationInput
              id="token"
              placeholder="666999"
              disabled={isPending}
              aria-invalid={Boolean(clientErrors.token) || Boolean(actionErrors?.token)}
              {...register("token")}
            />
            {clientErrors.token ? (
              <p className="text-red-700/80 text-sm">{clientErrors.token.message}</p>
            ) : null}
            {actionErrors?.token ? (
              <p className="text-red-700/80 text-sm">{actionErrorMessage(actionErrors.token)}</p>
            ) : null}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password" className="font-semibold text-muted-foreground">New Password</Label>
            <div className="w-full relative">
              <AuthenticationInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isPending}
                aria-invalid={Boolean(clientErrors.newPassword) || Boolean(actionErrors?.password)}
                className="pr-9"
                {...register("newPassword")}
              />
              <span
                className="absolute right-0 top-0 m-2.5 mr-4 text-muted-foreground cursor-pointer hover:text-accent-foreground/90 transition-colors duration-200"
                onClick={toggleShowPassword}>
                {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
              </span>
            </div>
            {clientErrors.newPassword ? (
              <p className="text-red-700/80 text-sm">{clientErrors.newPassword.message}</p>
            ) : null}
            {actionErrors?.token ? (
              <p className="text-red-700/80 text-sm">{actionErrorMessage(actionErrors.newPassword)}</p>
            ) : null}
          </div>

          <div className="grid">
            <Button variant="cool">
              {isPending ? <span className="animate-pulse">Reseting...</span> : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ResetPasswordForm;
