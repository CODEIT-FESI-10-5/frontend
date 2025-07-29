'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStudy } from '../model/useCreateStudy';
import { useCreateGoal } from '@/features/create-goal/model';
import { useQueryClient } from '@tanstack/react-query';
import { goalQueryKeys } from '@/entities/goal';
import { studyQueryKeys } from '@/entities/study';

export default function CreateStudyButton() {
  const queryClient = useQueryClient();
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
          //목표 리스트 쿼리 업데이트
          queryClient.invalidateQueries({
            queryKey: goalQueryKeys.list(Number(data.newStudyId)),
          });
          queryClient.invalidateQueries({
            queryKey: studyQueryKeys.list(),
          });
          console.log(newGoal);
          router.push(
            `/dashboard/study/${data.newStudyId}/goal/${String(newGoal.data.id)}`,
          );
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
