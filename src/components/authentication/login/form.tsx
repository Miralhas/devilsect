'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import AuthenticationInput from "@/components/ui/authentication-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoginInput, loginSchema } from "@/lib/schemas/login";
import { actionErrorMessage } from "@/lib/utils";
import { loginAction } from "@/service/authentication/actions/login-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleAuthButton from "../google-auth-button";

const LoginForm = ({ redirectUri = "/" }: { redirectUri?: string }) => {
  const [formState, formAction, isPending] = useActionState(loginAction, { success: false });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit"
  });

  const { errors: clientErrors } = form.formState;

  const onSubmit = form.handleSubmit((data: LoginInput) => {
    startTransition(() => formAction({ ...data, redirectUri }));
  });

  return (
    <form
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-5">
        {formState.errors?.error ? (
          <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error Logging In</AlertTitle>
            <AlertDescription className="font-light tracking-wider">
              {formState.errors.error}.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-3">
          <Label htmlFor="email" className="font-semibold text-muted-foreground">Email</Label>
          <AuthenticationInput
            id="email"
            placeholder="example@email.com"
            disabled={isPending}
            aria-invalid={Boolean(clientErrors.email) || Boolean(formState.errors?.email)}
            {...form.register("email")}
          />
          {clientErrors.email ? (
            <p className="text-red-700/80 text-sm">{clientErrors.email.message}</p>
          ) : null}
          {formState.errors?.email ? (
            <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.email)}</p>
          ) : null}
        </div>

        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="password" className="font-semibold text-muted-foreground">Password</Label>
            <Link href="/reset-password" className="font-medium leading-none text-muted-foreground text-xs transition-colors duration-100 hover:text-accent-foreground">Forgot password?</Link>
          </div>
          <div className="w-full relative">
            <AuthenticationInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isPending}
              aria-invalid={Boolean(clientErrors.password) || Boolean(formState.errors?.password)}
              className="pr-9"
              {...form.register("password")}
            />
            <span
              className="absolute right-0 top-0 m-2.5 mr-4 text-muted-foreground cursor-pointer hover:text-accent-foreground/90 transition-colors duration-200"
              onClick={toggleShowPassword}>
              {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </span>
          </div>
          {clientErrors.password ? (
            <p className="text-red-700/80 text-sm">{clientErrors.password.message}</p>
          ) : null}
          {formState.errors?.password ? (
            <p className="text-red-700/80 text-sm">{actionErrorMessage(formState.errors.password)}</p>
          ) : null}
        </div>

        <Button variant="cool" type="submit" disabled={isPending}>
          {isPending ? <span className="animate-pulse">Logging in...</span> : "Login"}
        </Button>

        <div className="flex justify-center items-center text-xs text-muted-foreground uppercase font-roboto leading-none tracking-wide">
          <span>Or continue with</span>
        </div>

        <div className="grid">
          <GoogleAuthButton redirectUri={redirectUri} />
        </div>
      </div>
    </form >
  )
}

export default LoginForm;
