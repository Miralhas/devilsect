import * as z from 'zod';

export const uploadDownloadJobSchema = z.object({
  slug: z.string(),
  start: z.number(),
  end: z.number(),
  exclude: z.array(z.number()).optional(),
});

export type UploadDownloadJobInput = z.infer<typeof uploadDownloadJobSchema>;