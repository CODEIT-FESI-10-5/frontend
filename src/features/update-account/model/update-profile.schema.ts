import * as z from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    password: z
      .string()
      .min(8, { message: '비밀번호가 8자 이상이 되도록 해주세요.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const changeNicknameSchema = z.object({
  nickname: z.string().max(10, { message: '닉네임을 10자 내로 적어주세요.' }),
});

export type ChangeNicknameSchema = z.infer<typeof changeNicknameSchema>;
