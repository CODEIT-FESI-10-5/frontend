'use client';
import React from 'react';
import { useCreateStudy } from '../model/useCreateStudy';
import { Button } from '@/shared/ui';
import { useDrawerStore } from '@/shared/model';

export default function CreateStudyButton() {
  const mutation = useCreateStudy();
  const { close } = useDrawerStore();
  const handleClick = () => {
    mutation.mutate(null);
    close();
  };

  return (
    <Button
      label="스터디 만들기"
      size="md"
      theme="primary"
      className="w-143"
      type="button"
      onClick={handleClick}
      isPending={mutation.isPending}
    />
  );
}
