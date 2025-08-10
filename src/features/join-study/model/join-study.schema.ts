import * as z from 'zod';

export const joinStudySchema = z.object({
  inviteCode: z
    .string()
    .min(8, { message: '영문/숫자 8자리를 입력해 주세요.' }),
});

export type JoinStudySchema = z.infer<typeof joinStudySchema>;
