'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStudyMutation } from '../model/useCreateStudyMutation';

export default function CreateStudyButton() {
  const router = useRouter();

  const mutation = useCreateStudyMutation((data) => {
    console.log('button clicked', data.newStudyId);
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
