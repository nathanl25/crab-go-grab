import { z } from 'zod';

export const rollSchema = z.object({
  roll: z.string(),
});

export type RollFormData = z.infer<typeof rollSchema>;
