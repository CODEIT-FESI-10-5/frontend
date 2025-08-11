'use client';
import { useState } from 'react';
import { Button, TextField } from '@/shared/ui';
import {
  UpdatePasswordSchema,
  useUpdatePassword,
  updatePasswordSchema,
} from '../model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function UpdatePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useUpdatePassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: UpdatePasswordSchema) => {
    mutate(data);
    reset();
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isOpen) {
      if (isValid) {
        handleSubmit(onValid)();
      }
    } else {
      setIsOpen(!isOpen);
    }
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <section className="flex flex-col gap-16 px-28 py-30">
        <h2 className="text-text-white body-medium">계정 보안</h2>
        <div className="flex items-center justify-between">
          <h3 className="body-medium text-white">비밀번호</h3>
          <Button
            label="비밀번호 변경"
            size="xs"
            disabled={!isValid}
            theme="primary"
            type="submit"
            form="change-password-form"
            onClick={handleClick}
          />
        </div>
        {isOpen && (
          <form
            id="change-password-form"
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-30"
          >
            <div className="flex flex-col gap-8">
              <label className="label-large text-text-tertiary">
                기존 비밀번호
              </label>
              <TextField
                placeholder="기존 비밀번호를 입력해주세요."
                {...register('currentPassword')}
                error={!!errors.currentPassword}
                errorMessage={errors.currentPassword?.message}
                type="password"
              />
            </div>
            <div className="flex flex-col gap-8">
              <label className="label-large text-text-tertiary">
                새 비밀번호
              </label>
              <TextField
                placeholder="비밀번호를 8자 이상 입력해주세요."
                {...register('password')}
                error={!!errors.password}
                errorMessage={errors.password?.message}
                type="password"
              />
              <TextField
                placeholder="비밀번호를 다시 입력해주세요."
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                type="password"
              />
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
