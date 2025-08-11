'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui';
import TextField from '@/shared/ui/TextField';
import Link from 'next/link';
import {
  LoginSchema,
  loginSchema,
  useLogin,
} from '@/features/auth-login/model';

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-60">
        <div className="flex flex-col gap-30">
          <TextField
            label="이메일"
            type="text"
            placeholder="이메일을 입력해주세요."
            {...register('email', { required: true })}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <TextField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register('password', { required: true })}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
        </div>
        <Button
          label="로그인"
          disabled={!isValid}
          theme="primary"
          size="lg"
          type="submit"
          isPending={isPending}
        />
      </form>
      <div className="mt-24 flex items-start justify-center">
        <p className="text-text-tertiary label-small">
          아직 회원이 아닌가요?&nbsp;
          <Link
            href={'/auth/sign-up'}
            className="text-text-secondary label-small underline"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
