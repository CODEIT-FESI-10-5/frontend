'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/shared/ui/SubmitButton';
import TextField from '@/shared/ui/TextField';
import Link from 'next/link';
import {
  LoginSchema,
  loginSchema,
  useLogin,
} from '@/features/auth-login/model';

export default function LoginForm() {
  const { mutate } = useLogin();
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
  console.log('login', errors.email?.message);

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
        <SubmitButton name="로그인" isActive={isValid} type="submit" />
      </form>
      <div className="mt-24 flex items-start justify-center">
        <p className="text-text-tertiary label-medium">
          아직 회원이 아닌가요?&nbsp;
          <Link
            href={'/'}
            className="text-text-secondary label-medium underline"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
