// 목적지 url만 반환하는 훅
import { useGetStudy } from '@/entities/study/model/useGetStudy';
import { useGetGoal } from '@/entities/goal/model/useGetGoal';

/**
 * 스터디/목표 존재 여부에 따라 대시보드 내에서 적절한 경로로 리다이렉트하는 훅
 *
 * useRedirect(); // 페이지 진입 시 자동 라우팅
 */

type DeleteType = 'study' | 'goal';

/**
 * @param deleteType 'study' | 'goal' (삭제 타입)
 * @param studyId goal 삭제 시 기준이 되는 스터디 id (goal 삭제 시 필수)
 */
export function useRedirect(
  deleteType: DeleteType = 'study',
  studyId?: string | number,
) {
  let baseStudyId: string | number | undefined;
  let isStudyFetched = true;
  let studyData: any = undefined;

  // 스터디 데이터 가져오기
  if (deleteType === 'study') {
    const study = useGetStudy();
    studyData = study.data;
    isStudyFetched = study.isFetched;
    baseStudyId = studyData?.studyList?.[0]?.id;
  } else {
    // 타입이 goal인 경우 스터디 id값 사용
    baseStudyId = studyId;
  }
  const studyIdNum = Number(baseStudyId);
  const { data: goalData, isFetched: isGoalFetched } = useGetGoal(studyIdNum, {
    enabled: !!studyIdNum,
  });

  // 목적지 url만 반환
  if (!isStudyFetched) return undefined;
  if (deleteType === 'study' && (!studyData || studyData.totalCount === 0)) {
    return '/dashboard/study';
  }
  if (!baseStudyId || isNaN(studyIdNum)) {
    return '/dashboard/study';
  }
  if (!isGoalFetched) return undefined;
  if (goalData && goalData.totalCount !== 0) {
    return `/dashboard/study/${baseStudyId}/goal/${goalData.goals[0].id}`;
  } else {
    return `/dashboard/study/${baseStudyId}`;
  }
}
