import { z } from 'zod';

const chatMessagePattern = /^[\s\S]{1,50}$/;
const chatMessageMsg = 'Message must be between 1 and 50 characters';

export const chatMessageSchema = z.object({
  message: z.string().regex(chatMessagePattern, {
    message: chatMessageMsg,
  }),
});
export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;
