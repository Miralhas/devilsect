import z from 'zod';

const USERNAME_REGEX = /^[a-zA-Z0-9_]*$/

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long"
    })
    .max(20, {
      message: "Username cannot be more than 20 characters long"
    })
    .regex(USERNAME_REGEX, {
      message: "Usernames may only contain letters, numbers, and underscores. Please choose a valid username"
    })
    .optional()
    .or(z.literal('')).transform(val => val === "" ? undefined : val),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long",
    })
    .optional()
    .or(z.literal('')).transform(val => val === "" ? undefined : val),
  confirmPassword: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long",
    })
    .optional()
    .or(z.literal('')).transform(val => val === "" ? undefined : val),
})
.refine(value => value.password === value.confirmPassword, {
  message: "Passwords must be the same",
  path: ["confirmPassword"]
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;