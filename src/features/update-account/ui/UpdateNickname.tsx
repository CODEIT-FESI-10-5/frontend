'use client';
import { useState } from 'react';
import { TextField } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { useChangeNickname } from '../model/useChangeNickname';
import { useForm } from 'react-hook-form';
import { changeNicknameSchema, ChangeNicknameSchema } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

export default function UpdateNickname() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useChangeNickname();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangeNicknameSchema>({
    resolver: zodResolver(changeNicknameSchema),
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: ChangeNicknameSchema) => {
    mutate(data);
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      if (isValid) {
        handleSubmit(onValid)();
      }
    } else {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div>
      <section className="flex flex-col gap-16 px-28 py-30">
        <h2 className="text-text-white body-medium">개인정보</h2>
        <div className="flex flex-col gap-20">
          <form className="flex flex-col gap-4">
            <label className="label-large text-text-tertiary">닉네임</label>
            <div className="flex items-center justify-between gap-10">
              <div className="flex-1">
                {isOpen ? (
                  <TextField
                    {...register('nickname')}
                    placeholder="닉네임을 입력해주세요."
                    error={!!errors.nickname}
                    errorMessage={errors.nickname?.message}
                  />
                ) : (
                  <p className="text-text-white body-medium">스터디 닉네임</p>
                )}
              </div>
              <Button
                label="닉네임 수정"
                size="xs"
                theme="primary"
                type="button"
                disabled={!isValid && !isOpen}
                onClick={handleClick}
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
