'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import AuthenticationInput from "@/components/ui/authentication-input";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/ui/google-icon";
import { Label } from "@/components/ui/label";
import { SignupInput, signUpSchema } from "@/lib/schemas/signup";
import { signupAction } from "@/services/authentication/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const [formState, formAction, isPending] = useActionState(signupAction, { success: false });
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

  const onSubmit = form.handleSubmit((data: SignupInput) => {
    startTransition(() => formAction(data));
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        
        {formState.errors?.error ? (
          <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error Signing Up</AlertTitle>
            <AlertDescription className="font-light tracking-wider">
              {formState.errors.error}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-3">
          <Label htmlFor="email" className="font-semibold text-muted-foreground">Email</Label>
          <AuthenticationInput
            id="email"
            placeholder="wanglin@email.com"
            disabled={isPending}
            aria-invalid={Boolean(clientErrors.email) || Boolean(formState.errors?.email)}
            {...form.register("email")}
          />
          {clientErrors.email ? (
            <p className="text-red-700/80 text-sm">{clientErrors.email.message}</p>
          ) : null}
          {formState.errors?.email ? (
            <p className="text-red-700/80 text-sm">{formState.errors.email.join(',')}</p>
          ) : null}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="username" className="font-semibold text-muted-foreground">Username</Label>
          <AuthenticationInput
            id="username"
            type="text"
            placeholder="WangLin"
            disabled={isPending}
            aria-invalid={Boolean(clientErrors.username) || Boolean(formState.errors?.username)}
            {...form.register("username")}
          />
          {clientErrors.username ? (
            <p className="text-red-700/80 text-sm">{clientErrors.username.message}</p>
          ) : null}
          {formState.errors?.username ? (
            <p className="text-red-700/80 text-sm">{formState.errors.username.join(',')}</p>
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
            <p className="text-red-700/80 text-sm">{formState.errors.password.join('. ')}</p>
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
              aria-invalid={Boolean(clientErrors.confirmPassword) || Boolean(formState.errors?.confirmPassword)}
              {...form.register("confirmPassword")}
            />
            <span className="absolute right-0 top-0 m-2.5 mr-4 text-muted-foreground cursor-pointer hover:text-accent-foreground/90 transition-colors duration-200" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </span>
          </div>
          {clientErrors.confirmPassword ? (
            <p className="text-red-700/80 text-sm">{clientErrors.confirmPassword.message}</p>
          ) : null}
          {formState.errors?.confirmPassword ? (
            <p className="text-red-700/80 text-sm">{formState.errors.confirmPassword.join('. ')}</p>
          ) : null}
        </div>

        <Button variant="cool" type="submit" disabled={isPending}>
          {isPending ? <span className="animate-pulse">Signing up...</span> : "Sign up"}
        </Button>

        <div className="flex justify-center items-center text-xs text-muted-foreground uppercase font-roboto leading-none tracking-wide">
          <span>Or continue with</span>
        </div>

        <div className="grid">
          <Button className="gap-4" variant="cool-secondary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <GoogleIcon />
            Google
          </Button>
        </div>
      </div>
    </form >
  )
}

export default SignupForm;
