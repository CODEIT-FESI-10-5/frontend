'use client';

import { useGoal } from '@/entities/goal/model/useGoal';
import GoalCard from '@/entities/goal/ui/goalCard';
import { use } from 'react';

interface GoalPageProps {
  params: Promise<{
    studyId: string;
    goalId: string;
  }>;
}

export default function GoalPage({ params }: GoalPageProps) {
  const { studyId, goalId } = use(params);

  const { data: goal, isLoading, error } = useGoal(studyId, goalId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-white">대시보드 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">
          대시보드를 불러오는 중 에러가 발생했습니다:{' '}
          {error instanceof Error ? error.message : '알 수 없는 에러'}
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">대시보드를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="px-32 py-36">
      <h3 className="title-medium text-text-secondary mb-15 ml-12">
        스터디 현황
      </h3>
      <GoalCard goal={goal} />
    </div>
  );
}
