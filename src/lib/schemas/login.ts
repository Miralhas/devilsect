import z from 'zod';


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: "E-mail is required"})
    .email("Must be a well-formed e-mail address"),
  password: z
    .string()
    .min(4, { message: "The password you provided must have at least 4 characters" })
});

export type LoginInput = z.infer<typeof loginSchema>;