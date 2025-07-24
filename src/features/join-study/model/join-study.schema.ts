import * as z from 'zod';

export const joinStudySchema = z.object({
  inviteCode: z
    .string()
    .min(8, { message: '알파벳 대/소문자 조합 숫자 8자리를 입력해 주세요.' }),
});

export type JoinStudySchema = z.infer<typeof joinStudySchema>;
