'use client';
import React from 'react';
import { useCreateStudy } from '../model/useCreateStudy';

export default function CreateStudyButton() {
  const mutation = useCreateStudy();

  return (
    <button
      onClick={() => mutation.mutate()}
      className="bg-primary title-small text-text-white rounded-6 h-50 w-143"
    >
      스터디 만들기
    </button>
  );
}
