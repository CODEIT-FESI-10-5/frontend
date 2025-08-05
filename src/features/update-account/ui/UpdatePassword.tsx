'use client';
import { useState } from 'react';
import InputField from './InputField';
import { Button } from '@/shared/ui';

export default function UpdatePassword() {
  const [isActive] = useState(false);
  return (
    <div>
      <section className="flex flex-col gap-16 px-28 py-30">
        <h2 className="text-text-white body-medium">계정 보안</h2>
        <div className="flex items-center justify-between">
          <h3 className="body-medium text-white">비밀번호</h3>
          <Button
            label="비밀번호 변경"
            size="xs"
            disabled={!isActive}
            theme="primary"
            type="submit"
          />
        </div>
        {isActive && <ChangePassword />}
      </section>
    </div>
  );
}

function ChangePassword() {
  return (
    <div className="flex flex-col gap-30">
      <div className="flex flex-col gap-8">
        <label className="label-large text-text-tertiary">기존 비밀번호</label>
        <InputField />
      </div>
      <div className="flex flex-col gap-8">
        <label className="label-large text-text-tertiary">새 비밀번호</label>
        <InputField />
        <InputField />
      </div>
    </div>
  );
}
