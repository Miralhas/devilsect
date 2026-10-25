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
import { revalidatePath } from "@/service/actions";
import { useEditProfile } from "@/service/user/mutations/use-edit-profile-mutation";
import { User } from "@/types/authentication";
import { isApiError } from "@/utils/common-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditProfileForm = ({ user, handleClose }: { user: User; handleClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const mutation = useEditProfile();

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { username: user.username, password: "", confirmPassword: "" },
    mode: "onSubmit"
  });

  const { errors, isDirty } = form.formState;

  const onSubmit = (input: EditProfileInput) => {
    mutation.mutate(input, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        revalidatePath("/profile");
        handleClose();
      },
      onError: (error) => {
        console.log(error)
        form.setError('root', { message: isApiError(error) ? error.detail : error.message })
        if (isApiError(error) && error.errors) {
          Object.entries(error.errors).map(([key, value]) => {
            form.setError(
              key as keyof EditProfileInput,
              {
                type: error.status.toString(),
                message: value,
              });
          });
        }
      },
    })
  };

  const isPending = mutation.isPending

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      {errors.root ? (
        <Alert variant="destructive" className="bg-primary/20 border border-accent/70 rounded-sm text-red-900">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Error editing profile</AlertTitle>
          <AlertDescription className="tracking-wider">
            {errors.root.message}
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
          aria-invalid={Boolean(errors.username)}
          {...form.register("username")}
        />
        {errors.username ? (
          <p className="text-red-700/80 text-sm">{errors.username.message}</p>
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
            aria-invalid={Boolean(errors.password)}
            className="pr-9"
            {...form.register("password")}
          />
          <span
            className="absolute right-0 top-0 m-2.5 mr-4 text-muted-foreground cursor-pointer hover:text-accent-foreground/90 transition-colors duration-200"
            onClick={toggleShowPassword}>
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </span>
        </div>
        {errors.password ? (
          <p className="text-red-700/80 text-sm">{errors.password.message}</p>
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
            aria-invalid={Boolean(errors.confirmPassword)}
            {...form.register("confirmPassword")}
          />
          <span className="absolute right-0 top-0 m-2.5 mr-4 text-muted-foreground cursor-pointer hover:text-accent-foreground/90 transition-colors duration-200" onClick={toggleShowConfirmPassword}>
            {showConfirmPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </span>
        </div>
        {errors.confirmPassword ? (
          <p className="text-red-700/80 text-sm">{errors.confirmPassword.message}</p>
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
