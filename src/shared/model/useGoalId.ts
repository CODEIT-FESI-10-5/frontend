import { useParams } from 'next/navigation'; // next/router in older versions
import { useEffect } from 'react';

export const useGoalId = (): string => {
  const params = useParams<{ goalId: string }>();
  const goalId = params?.goalId;

  // 기본 에러 처리: goalId가 없으면 404 페이지로 보내거나 toast 띄우기
  useEffect(() => {
    if (!goalId) {
      // 예: toast.error('유효하지 않은 goalId입니다.');
      // 혹은 router.push('/404');
    }
  }, [goalId]);

  if (!goalId) {
    throw new Error('goalId가 존재하지 않습니다');
  }

  return goalId;
};
