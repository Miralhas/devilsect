'use client'

import {
  ResetPasswordTokenInput,
  SendResetPasswordInput,
  resetPasswordTokenSchema,
  sendResetPasswordEmailSchema
} from "@/lib/schemas/reset-password";
import { useForgotPasswordEmail } from "@/service/authentication/mutations/use-forgot-password-email";
import { useResetPassword } from "@/service/authentication/mutations/use-reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ResetPasswordForm from "./reset-password-form";
import SendEmailForm from "./send-email-form";
import SuccessFullPasswordReset from "./successful-password-reset";
import { isApiError } from "@/utils/common-utils";

const ResetPassword = () => {
  const forgotPasswordMutation = useForgotPasswordEmail();
  const resetPasswordMutation = useResetPassword();

  const sendEmailForm = useForm<SendResetPasswordInput>({
    resolver: zodResolver(sendResetPasswordEmailSchema),
    defaultValues: { email: "" },
    mode: "onSubmit"
  });

  const passwordResetForm = useForm<ResetPasswordTokenInput>({
    resolver: zodResolver(resetPasswordTokenSchema),
    defaultValues: { newPassword: "", token: "" },
    mode: "onSubmit"
  });

  const { errors: resetPasswordClientErrors } = passwordResetForm.formState;

  const { errors: sendEmailClientErrors } = sendEmailForm.formState;

  const onSendEmailFormSubmit = sendEmailForm.handleSubmit((data: SendResetPasswordInput) => {
    forgotPasswordMutation.mutate(data, {
      onError: () => toast.error("Failed to send password reset email. Try again later!"),
      onSuccess: () => toast.success("Password reset email sent", {
        description:
          "The email may take a few minutes to arrive. Please check your spam folder if you don't see it in your inbox.",
      }),
    })
  });

  const onPasswordResetFormSubmit = passwordResetForm.handleSubmit((data: ResetPasswordTokenInput) => {
    resetPasswordMutation.mutate(data, {
      onError: (error) => toast.error("Failed to reset password!", {
        description: isApiError(error) ? error.detail : error.message,
      }),
      onSuccess: () => toast.success("Successfull Password Reset",
        { description: "Your password has been reset successfully" }
      ),
    })
  });

  if (resetPasswordMutation.isSuccess) {
    return <SuccessFullPasswordReset />
  }

  return (
    <>
      {!forgotPasswordMutation.isSuccess ? (
        <SendEmailForm
          register={sendEmailForm.register}
          errors={sendEmailClientErrors}
          isPending={resetPasswordMutation.isPending}
          onSubmit={onSendEmailFormSubmit}
        />
      ) : (
        <ResetPasswordForm
          errors={resetPasswordClientErrors}
          email={sendEmailForm.getValues('email')}
          isPending={resetPasswordMutation.isPending}
          onSubmit={onPasswordResetFormSubmit}
          register={passwordResetForm.register}
        />
      )}
    </>
  )
}

export default ResetPassword;
