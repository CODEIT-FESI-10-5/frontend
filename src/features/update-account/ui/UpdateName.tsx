'use client';
import { useState } from 'react';
import { InputField } from './';
import { Button } from '@/shared/ui';

export default function UpdateName() {
  const [isActive] = useState(false);
  return (
    <div>
      <section className="flex flex-col gap-16 px-28 py-30">
        <h2 className="text-text-white body-medium">개인정보</h2>
        <div className="flex flex-col gap-20">
          <form className="flex flex-col">
            <label className="label-large text-text-tertiary">닉네임</label>
            <div className="flex items-center justify-between">
              <div className="w-376">
                {isActive ? (
                  <InputField />
                ) : (
                  <p className="text-text-white body-medium">스터디 닉네임</p>
                )}
              </div>
              <Button
                label="닉네임 수정"
                size="xs"
                disabled={!isActive}
                theme="primary"
                type="submit"
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
