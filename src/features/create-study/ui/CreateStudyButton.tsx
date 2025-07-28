'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStudy } from '../model/useCreateStudy';
import { useCreateGoal } from '@/features/create-goal/model';

export default function CreateStudyButton() {
  const router = useRouter();
  const goalMutation = useCreateGoal();
  const mutation = useCreateStudy((data) => {
    goalMutation.mutate(
      {
        title: '스터디 목표를 입력해주세요.',
        studyId: Number(data.newStudyId),
      },
      {
        onSuccess: (newGoal) => {
          router.push(`/dashboard/${data.newStudyId}/goal/${newGoal.id}`);
        },
      },
    );
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="bg-primary title-small text-text-white rounded-6 h-50 w-143"
    >
      스터디 만들기
    </button>
  );
}
