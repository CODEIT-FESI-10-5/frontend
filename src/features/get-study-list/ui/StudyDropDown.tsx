'use client';
import { StudyItem, StudyListResponse } from '@/entities/study/model/types';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { getGoalList, goalQueryKeys } from '@/entities/goal';
import { useDrawerStore } from '@/shared/model';
import { useStudyStore } from '../model';
import { studyQueryKeys } from '@/entities/study';

interface StudyDropDownProps {
  data: StudyListResponse;
  onClick: () => void;
}

export default function StudyDropDown({ onClick, data }: StudyDropDownProps) {
  const { currentStudyId } = useStudyStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { close } = useDrawerStore();

  // 스터디 선택 시 로직
  const handleClick = async (study: StudyItem) => {
    try {
      const goalData = await queryClient.fetchQuery({
        queryKey: goalQueryKeys.list(Number(study.id)),
        queryFn: () => getGoalList(Number(study.id)),
      });

      const goals = goalData.data.goals;

      if (goalData.data.totalCount !== 0) {
        const firstGoalId = goals[0].id;
        router.push(`/dashboard/study/${study.id}/goal/${firstGoalId}`);
      } else {
        router.push(`/dashboard/study/${study.id}`);
      }

      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.list(Number(study.id)),
      });
      queryClient.invalidateQueries({
        queryKey: studyQueryKeys.list(),
      });
    } catch (err) {
      console.error('goal 리스트 조회 실패:', err);
      // fallback 처리
      router.push(`/dashboard/study/${study.id}`);
    }
    onClick();
    close();
  };

  return (
    <div className="bg-surface-4 rounded-b-6 scrollbar-hide xl:rounded-6 xl:border-border-emphasis xl:-y-12 flex w-full flex-col items-center justify-start gap-24 p-16 xl:mt-12 xl:max-h-289 xl:gap-14 xl:overflow-y-scroll xl:border-1 xl:px-7">
      {data.studyList
        .filter((study: StudyItem) => study.id !== currentStudyId)
        .map((study: StudyItem) => (
          <div
            key={study.id}
            onClick={() => handleClick(study)}
            className="xl:hover:bg-border-default rounded-6 flex h-76 min-h-76 w-full cursor-pointer flex-col xl:min-h-96 xl:gap-12 xl:px-8 xl:py-13"
          >
            <h3 className="text-text-secondary m-title-small xl:title-small">
              {study.title}
            </h3>
            <p className="text-text-secondary m-body-small xl:label-small max-w-264">
              {study.description}
            </p>
          </div>
        ))}
    </div>
  );
}
