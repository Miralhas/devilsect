import { z } from "zod";

const OTP_TOKEN_REGEX = /^\d+$/

export const sendResetPasswordEmailSchema = z.object({
  email: z
    .string()
    .email("Must be a well-formed e-mail address")
})

export const resetPasswordTokenSchema = z.object({
  token: z
    .string()
    .min(6, { message: "Reset password tokens must be 6 characters long" })
    .max(6, { message: "Reset password tokens must be 6 characters long" })
    .regex(OTP_TOKEN_REGEX, {message: "Reset password token must contain only digits [0 ~ 9]"}),
  newPassword: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long",
    }),
})

export type ResetPasswordTokenInput = z.infer<typeof resetPasswordTokenSchema>;

export type SendResetPasswordInput = z.infer<typeof sendResetPasswordEmailSchema>;

