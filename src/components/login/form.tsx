'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { LoginInput, loginSchema } from "@/lib/schemas/login";
import { loginAction } from "@/services/authentication/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import AuthenticationInput from "../ui/authentication-input";
import { Button } from "../ui/button";
import GoogleIcon from "../ui/google-icon";
import { Label } from "../ui/label";

const LoginForm = () => {
  const [formState, formAction, isPending] = useActionState(loginAction, { success: false });

  console.log(formState.errors)

  const { ...form } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit"
  });

  const { errors: clientErrors } = form.formState;

  const onSubmit = form.handleSubmit((data: LoginInput) => {
    startTransition(() => {
      formAction(data);
    });
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
              {formState.errors.error}
            </AlertDescription>
          </Alert>
        ) : null}
        <div className="grid gap-3">
          <>
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
              <p className="text-red-700/80 text-sm">{formState.errors.email.join(',')}</p>
            ) : null}
          </>

        </div>
        <div className="grid gap-3">
          <>
            <div className="flex justify-between">
              <Label htmlFor="password" className="font-semibold text-muted-foreground">Password</Label>
              <Link href="/reset-password" className="font-medium leading-none text-muted-foreground text-xs transition-colors duration-100 hover:text-accent-foreground">Forgot password?</Link>
            </div>
            <AuthenticationInput
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
              aria-invalid={Boolean(clientErrors.password) || Boolean(formState.errors?.password)}
              {...form.register("password")}
            />
            {clientErrors.password ? (
              <p className="text-red-700/80 text-sm">{clientErrors.password.message}</p>
            ) : null}
            {formState.errors?.password ? (
              <p className="text-red-700/80 text-sm">{formState.errors.password.join('. ')}</p>
            ) : null}
          </>


        </div>

        <Button variant="cool" type="submit" disabled={isPending}>
          {isPending ? (<span className="animate-pulse">Logging in...</span>) : "Login"}
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

export default LoginForm;
