import * as z from 'zod';

export const joinStudySchema = z.object({
  inviteCode: z.string().min(8),
});

export type JoinStudySchema = z.infer<typeof joinStudySchema>;
