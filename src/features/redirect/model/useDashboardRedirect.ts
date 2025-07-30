'use client';

import { useGetGoal, useGoalStore } from '@/entities/goal/model';
import { useGetStudy, useStudyStore } from '@/entities/study/model';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useDashboardRedirect() {
  const router = useRouter();
  const { data: studyData } = useGetStudy();
  const { currentStudyId, setStudyId } = useStudyStore();
  const { getLastVisitedGoalId } = useGoalStore();

  // study가 있는지 검사
  const studyId = currentStudyId || studyData?.studyList?.[0]?.id || '';

  // goalId가 있는지 검사 (studyId가 존재하는 경우)
  const { data: goalData } = useGetGoal(Number(studyId), {
    enabled: !!studyId,
  });
  const goalId = studyId ? getLastVisitedGoalId(studyId) : null;

  useEffect(() => {
    setStudyId(String(studyId));
    // 0. 스터디 데이터가 아예 안받아져오는 경우 처리 필요
    if (!studyData) router.push('/');
    // 1. 스터디가 없는 경우 홈으로 이동
    if (studyData?.totalCount === 0) {
      router.replace('/dashboard/study');
    }
    // 2. goal 리스트가 없으면 goal 생성 화면으로
    if (goalData && goalData.totalCount === 0) {
      router.replace(`/dashboard/study/${studyId}`);
      return;
    }
    // 3. store에 goal이 없으면 첫번째 goal로 이동
    if (!goalId) {
      const initialGoalId = String(goalData?.goals[0].id);
      router.replace(`/dashboard/study/${studyId}/goal/${initialGoalId}`);
      return;
    }
    // 4. 모든 조건이 있는 경우
    router.replace(`/dashboard/study/${studyId}/goal/${goalId})}`);
  }, []);
}
