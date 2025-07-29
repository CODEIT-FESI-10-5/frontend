'use client';
import { useGetGoal, useGoalStore } from '@/features/get-goal-list/model';
import { useStudyStore } from '@/features/get-study-list/model';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();
  const { currentStudyId } = useStudyStore();
  const { getLastVisitedGoalId } = useGoalStore();
  const { data: goalData } = useGetGoal(Number(currentStudyId));

  useEffect(() => {
    if (currentStudyId != null) {
      const goalId = getLastVisitedGoalId(currentStudyId);
      if (goalId != null) {
        router.push(`/dashboard/study/${currentStudyId}/goal/${goalId}`);
      } else {
        //goal ID 없을때 goal 목록 다시 불러와서 처리
        router.push(
          `/dashboard/study/${currentStudyId}/goal/${goalData?.goals[0].id}`,
        );
      }
    } else {
      router.push('/redirect');
    }
  }, [currentStudyId, getLastVisitedGoalId, router]);

  return null;
}
