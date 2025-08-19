'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import AuthenticationInput from "@/components/ui/authentication-input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { EditProfileInput, editProfileSchema } from "@/lib/schemas/edit-profile-schema";
import { editProfileAction } from "@/services/authentication/actions";
import { User } from "@/types/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";


const EditProfileForm = ({ user }: { user: User }) => {
  const [formState, formAction, isPending] = useActionState(editProfileAction, { success: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { username: user.username, password: "", confirmPassword: "" },
    mode: "onSubmit"
  });

  const { errors: clientErrors, isDirty, } = form.formState;

  const onSubmit = form.handleSubmit((data: EditProfileInput) => {
    startTransition(() => formAction(data));
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {formState.errors?.error ? (
        <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-900">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Error editing profile</AlertTitle>
          <AlertDescription className="tracking-wider">
            {formState.errors.error}
          </AlertDescription>
        </Alert>
      ) : null}
      <div className="grid gap-3">
        <Label htmlFor="username" className="font-semibold text-muted-foreground">Username</Label>
        <AuthenticationInput
          id="username"
          type="text"
          placeholder="Username"
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
        <Label htmlFor="password" className="font-semibold text-muted-foreground">New Password</Label>
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
      <div className="grid grid-cols-2 gap-4">
        <Button variant="cool" type="submit" disabled={isPending || !isDirty} className="w-full h-11">
          {isPending ? <span className="animate-pulse">Saving...</span> : "Save Changes"}
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="cool-secondary" className="w-full h-11">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </form>
  )
}

export default EditProfileForm;
