'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/shared/ui/SubmitButton';
import TextField from '@/shared/ui/TextField';
import Link from 'next/link';
import {
  SignUpSchema,
  signUpSchema,
  useSignUp,
} from '@/features/auth-sign-up/model';

export default function SignUpForm() {
  const { mutate } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: SignUpSchema) => {
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
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요."
            {...register('name', { required: true })}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <TextField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register('password', { required: true })}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <TextField
            label="비밀번호 재입력"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register('confirmPassword', { required: true })}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <SubmitButton name="회원가입" isActive={isValid} type="submit" />
      </form>
      <div className="mt-24 flex items-start justify-center">
        <Link
          href={'/auth/login'}
          className="text-text-secondary label-medium underline"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
