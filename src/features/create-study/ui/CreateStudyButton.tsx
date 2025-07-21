'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStudy } from '../model/useCreateStudy';

export default function CreateStudyButton() {
  const router = useRouter();

  const mutation = useCreateStudy((data) => {
    router.push(`/dashboard/${data.newStudyId}`);
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="bg-primary body-large text-text-white rounded-6 h-50 w-143"
    >
      스터디 만들기
    </button>
  );
}
