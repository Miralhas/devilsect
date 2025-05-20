import z from 'zod';


export const loginSchema = z.object({
  email: z
    .string()
    .email("Must be a well-formed e-mail address"),
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 6 characters",
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;