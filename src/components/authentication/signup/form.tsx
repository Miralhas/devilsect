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
import { SignupInput, signUpSchema } from "@/lib/schemas/signup";
import { useLoginMutation } from "@/service/authentication/mutations/use-login-mutation";
import { useSignUpMutation } from "@/service/authentication/mutations/use-signup-mutation";
import { isApiError } from "@/utils/common-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleAuthButton from "../google-auth-button";

const SignupForm = () => {
  const { login } = useAuthContext();
  const signUpMutation = useSignUpMutation();
  const loginMutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", username: "", password: "", confirmPassword: "" },
    mode: "onSubmit"
  });

  const { errors: clientErrors } = form.formState;

  const onSubmit = (input: SignupInput) => {
    signUpMutation.mutate(input, {
      onSuccess: () => {
        loginMutation.mutate(input, {
          onSuccess: async (tokens) => await login(tokens)
        })
      },
      onError: (error) => {
        form.setError('root', { message: isApiError(error) ? error.detail : error.message })
        if (isApiError(error) && error.errors) {
          Object.entries(error.errors).map(([key, value]) => {
            form.setError(
              key as keyof SignupInput,
              {
                type: error.status.toString(),
                message: value,
              });
          });
        }
      },
    })
  };

  const isPending = signUpMutation.isPending || loginMutation.isPending;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">

        {form.formState.errors?.root ? (
          <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error Signing Up</AlertTitle>
            <AlertDescription className="font-light tracking-wider">
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-3">
          <Label htmlFor="email" className="font-semibold text-muted-foreground">Email</Label>
          <AuthenticationInput
            id="email"
            placeholder="wanglin@email.com"
            disabled={isPending}
            aria-invalid={Boolean(clientErrors.email)}
            {...form.register("email")}
          />
          {clientErrors.email ? (
            <p className="text-red-700/80 text-sm">{clientErrors.email.message}</p>
          ) : null}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="username" className="font-semibold text-muted-foreground">Username</Label>
          <AuthenticationInput
            id="username"
            type="text"
            placeholder="WangLin"
            disabled={isPending}
            aria-invalid={Boolean(clientErrors.username)}
            {...form.register("username")}
          />
          {clientErrors.username ? (
            <p className="text-red-700/80 text-sm">{clientErrors.username.message}</p>
          ) : null}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password" className="font-semibold text-muted-foreground">Password</Label>
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

        <div className="grid gap-3">
          <Label htmlFor="confirm-password" className="font-semibold text-muted-foreground">Confirm Password</Label>
          <div className="w-full relative">
            <AuthenticationInput
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isPending}
              aria-invalid={Boolean(clientErrors.confirmPassword)}
              {...form.register("confirmPassword")}
            />
            <span className="absolute right-0 top-0 m-2.5 mr-4 text-muted-foreground cursor-pointer hover:text-accent-foreground/90 transition-colors duration-200" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </span>
          </div>
          {clientErrors.confirmPassword ? (
            <p className="text-red-700/80 text-sm">{clientErrors.confirmPassword.message}</p>
          ) : null}
        </div>

        <Button variant="cool" type="submit" disabled={isPending}>
          {isPending ? <span className="animate-pulse">Signing up...</span> : "Sign up"}
        </Button>

        <div className="flex justify-center items-center text-xs text-muted-foreground uppercase font-roboto leading-none tracking-wide">
          <span>Or continue with</span>
        </div>

        <div className="grid">
          <GoogleAuthButton />
        </div>
      </div>
    </form >
  )
}

export default SignupForm;
