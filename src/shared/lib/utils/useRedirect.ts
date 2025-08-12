// 목적지 url만 반환하는 훅
import { useGetStudy } from '@/entities/study/model/useGetStudy';
import { useGetGoal } from '@/entities/goal/model/useGetGoal';
import { StudyListResponse } from '@/entities/study';

/**
 * 스터디/목표 존재 여부에 따라 대시보드 내에서 적절한 경로로 리다이렉트하는 훅
 *
 * useRedirect(); // 페이지 진입 시 자동 라우팅
 */

type DeleteType = 'study' | 'goal';

/**
 * @param deleteType 'study' | 'goal' (삭제 타입)
 * @param studyId goal 삭제 시 기준이 되는 스터디 id (goal 삭제 시 필수)
 * @param enabled 훅 활성화 여부 (기본값: true)
 */
export function useRedirect(
  deleteType: DeleteType = 'study',
  studyId?: string | number,
  enabled: boolean = true,
) {
  // enabled가 false면 쿼리 비활성화
  const study = useGetStudy();
  const studyData: StudyListResponse | undefined = study.data;
  const isStudyFetched = study.isFetched;

  // studyId 결정
  const baseStudyId =
    deleteType === 'study' ? studyData?.studyList?.[0]?.id : studyId;
  const studyIdNum = Number(baseStudyId);
  const { data: goalData, isFetched: isGoalFetched } = useGetGoal(studyIdNum, {
    enabled: !!studyIdNum && enabled,
  });

  // enabled가 false면 undefined 반환
  if (!enabled) return undefined;

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
