import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z.string({ message: '비밀번호가 올바르지 않습니다.' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
