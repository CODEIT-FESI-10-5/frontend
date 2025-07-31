'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStudy } from '../model/useCreateStudy';
import { useQueryClient } from '@tanstack/react-query';
import { studyQueryKeys } from '@/entities/study';
import { goalQueryKeys } from '@/entities/goal';

export default function CreateStudyButton() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useCreateStudy((data) => {
    const newStudyId = data.newStudyId;
    // 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: studyQueryKeys.list(),
    });
    queryClient.invalidateQueries({
      queryKey: goalQueryKeys.list(Number(newStudyId)),
    });

    // 상태 업데이트 및 라우팅
    router.push(`/dashboard/study/${newStudyId}`);
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
