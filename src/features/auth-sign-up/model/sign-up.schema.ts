import * as z from 'zod';

export const signUpSchema = z
  .object({
    email: z.email({ message: '올바른 이메일 형식이 아닙니다.' }),
    name: z
      .string()
      .max(10, { message: '닉네임을 10자 내로 적어주세요' })
      .refine(async (id) => {
        // ID 존재 여부 검색
        // const result = await userId.parseAsync("abc123");
        return true;
      }),
    password: z
      .string()
      .min(8, { message: '비밀번호가 8자 이상이 되도록 해주세요.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
