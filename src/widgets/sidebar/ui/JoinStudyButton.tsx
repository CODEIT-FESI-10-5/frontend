'use client';
import { UpdateButton } from '@/features/update-account/ui';
import { useModal } from '@/shared/lib/utils/useModal';
import { SubmitButton, TextField } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function JoinStudyButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { open } = useModal();
  const [isActive, setIsActive] = useState(false);
  const handleSubmit = () => {
    setIsActive(!isActive);
  };

  const handleClick = () => {
    open(
      <div className="rounded-8 bg-surface-2 border-border-emphasis flex h-215 w-423 flex-col gap-18 border-1 px-30 py-32">
        <label className="headline-medium text-text-secondary">
          초대 코드 입력
        </label>
        <TextField
          label=""
          placeholder="초대 코드를 입력해 주세요."
          error={false}
        />
        <div className="h-55 w-88"></div>
      </div>,
      buttonRef,
      { top: 30, left: 0 },
    );
  };

  //코드 입력 창 처리
  return (
    <button
      className="bg-secondary title-small text-text-white rounded-6 h-50 w-143"
      onClick={handleClick}
      ref={buttonRef}
    >
      코드로 가입하기
    </button>
  );
}
