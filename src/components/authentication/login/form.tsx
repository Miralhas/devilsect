'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import AuthenticationInput from "@/components/ui/authentication-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/use-auth-context";
import { LoginInput, loginSchema } from "@/lib/schemas/login";
import { useLoginMutation } from "@/service/authentication/mutations/use-login-mutation";
import { isApiError } from "@/utils/common-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleAuthButton from "../google-auth-button";

const LoginForm = ({ redirectUri = "/" }: { redirectUri?: string }) => {
  const mutation = useLoginMutation();
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit"
  });

  const { errors: clientErrors } = form.formState;

  const onSubmit = (input: LoginInput) => {
    mutation.mutate(input, {
      onSuccess: async (tokens) => await login(tokens, redirectUri),
      onError: (error) => {
        form.setError('root', { message: isApiError(error) ? error.detail : error.message })
        if (isApiError(error) && error.errors) {
          Object.entries(error.errors).map(([key, value]) => {
            form.setError(
              key as keyof LoginInput,
              {
                type: error.status.toString(),
                message: value,
              });
          });
        }
      },
    });
  };

  const isPending = mutation.isPending;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        {form.formState.errors.root ? (
          <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error Logging In</AlertTitle>
            <AlertDescription className="font-light tracking-wider">
              {form.formState.errors.root.message}.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-3">
          <Label htmlFor="email" className="font-semibold text-muted-foreground">Email</Label>
          <AuthenticationInput
            id="email"
            placeholder="example@email.com"
            disabled={isPending}
            aria-invalid={Boolean(clientErrors.email)}
            {...form.register("email")}
          />
          {clientErrors.email ? (
            <p className="text-red-700/80 text-sm">{clientErrors.email.message}</p>
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
              aria-invalid={Boolean(clientErrors.password)}
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
