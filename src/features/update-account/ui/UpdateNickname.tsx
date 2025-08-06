'use client';
import { useState } from 'react';
import { Button, TextField } from '@/shared/ui';
import {
  updateNicknameSchema,
  UpdateNicknameSchema,
  useUpdateNickname,
} from '../model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function UpdateNickname() {
  const currentNickname = localStorage.getItem('nickname');
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useUpdateNickname();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateNicknameSchema>({
    resolver: zodResolver(updateNicknameSchema),
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: UpdateNicknameSchema) => {
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
        <h2 className="text-text-white body-medium">개인정보</h2>
        <div className="flex flex-col gap-20">
          <form className="flex flex-col gap-10">
            <label className="label-large text-text-tertiary">닉네임</label>
            <div className="flex items-start justify-between gap-10">
              <div className="flex-1">
                {isOpen ? (
                  <TextField
                    {...register('nickname')}
                    placeholder="닉네임을 입력해주세요."
                    error={!!errors.nickname}
                    errorMessage={errors.nickname?.message}
                    onBlur={() => setIsOpen(false)}
                  />
                ) : (
                  <p className="text-text-white body-medium mt-10">
                    {currentNickname}
                  </p>
                )}
              </div>
              <Button
                label="닉네임 수정"
                size="xs"
                disabled={!isOpen}
                theme="primary"
                type="submit"
                onClick={handleClick}
                className="mt-10"
              />
            </div>
          </form>
          <div>
            <h3 className="label-large text-text-tertiary">이메일</h3>
            <p className="text-text-white body-medium">user.mail</p>
          </div>
        </div>
      </section>
      <hr className="border-border-subtle border-1" />
    </div>
  );
}
