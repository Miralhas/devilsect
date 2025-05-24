import z from 'zod';

export const googleOAuth2Schema = z.object({
  iss: z.string(),
  azp: z.string(),
  aud: z.string(),
  sub: z.string(),
  email: z.string().email(),
  email_verified: z.boolean(),
  at_hash: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type GoogleOAuth2Payload = z.infer<typeof googleOAuth2Schema>;