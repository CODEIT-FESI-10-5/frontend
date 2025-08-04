'use client';
import { useState } from 'react';
import { TextField } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { useChangePassword } from '../model/useChangePassword';
import { changePasswordSchema, ChangePasswordSchema } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function UpdatePassword() {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
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
            isActive={isActive}
            theme="primary"
            type="button"
            onClick={handleClick}
          />
        </div>
        {isOpen && <ChangePassword />}
      </section>
    </div>
  );
}

function ChangePassword() {
  const { mutate } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: ChangePasswordSchema) => {
    mutate(data);
  };
  return (
    <div className="flex flex-col gap-30">
      <div className="flex flex-col gap-8">
        <label className="label-large text-text-tertiary">기존 비밀번호</label>
        <TextField
          id="currentPassword"
          placeholder="기존 비밀번호를 입력해주세요."
          error={false}
        />
      </div>
      <div className="flex flex-col gap-8">
        <label className="label-large text-text-tertiary">새 비밀번호</label>
        <TextField
          id="newPassword"
          placeholder="비밀번호를 8자 이상 입력해주세요."
          error={false}
        />
        <TextField
          id="confirmPassword"
          placeholder="비밀번호를 다시 입력해주세요."
          error={false}
        />
      </div>
    </div>
  );
}
