import { z } from 'zod';

const namePattern = /[a-zA-Z0-9]{4,12}/;
const nameMsg =
  'Name must be between 4 and 12 characters, and must only contain letters or numbers';

export const joinSchema = z.object({
  name: z.string().regex(namePattern, {
    message: nameMsg,
  }),
});

export type JoinFormData = z.infer<typeof joinSchema>;
