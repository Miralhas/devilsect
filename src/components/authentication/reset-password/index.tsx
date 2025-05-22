'use client'

import { ResetPasswordTokenInput, SendResetPasswordInput, resetPasswordTokenSchema, sendResetPasswordEmailSchema } from "@/lib/schemas/reset-password";
import { resetPasswordAction, sendResetPasswordEmailAction } from "@/services/authentication/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import ResetPasswordForm from "./reset-password-form";
import SendEmailForm from "./send-email-form";
import SuccessFullPasswordReset from "./successful-password-reset";

const ResetPassword = () => {
  const [sendEmailState, sendEmailAction, isSendEmailPending] = useActionState(sendResetPasswordEmailAction, { success: false });
  const [passwordResetState, passwordResetAction, isPasswordResetPending] = useActionState(resetPasswordAction, { success: false });

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
    startTransition(() => sendEmailAction(data));
  });

  const onPasswordResetFormSubmit = passwordResetForm.handleSubmit((data: ResetPasswordTokenInput) => {
    startTransition(() => passwordResetAction(data));
  });

  if (passwordResetState.success) {
    return <SuccessFullPasswordReset />
  }

  return (
    <>
      {!sendEmailState.success ? (
        <SendEmailForm
          register={sendEmailForm.register}
          actionErrors={sendEmailState.errors}
          clientErrors={sendEmailClientErrors}
          isPending={isSendEmailPending}
          onSubmit={onSendEmailFormSubmit}
        />
      ) : (
        <ResetPasswordForm
          clientErrors={resetPasswordClientErrors}
          email={sendEmailState.fields!.email}
          isPending={isPasswordResetPending}
          onSubmit={onPasswordResetFormSubmit}
          register={passwordResetForm.register}
          actionErrors={passwordResetState.errors}
        />
      )}
    </>
  )
}

export default ResetPassword;
