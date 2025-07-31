'use client';
import { StudyItem, StudyListResponse } from '@/entities/study/model/types';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { getGoalList, goalQueryKeys } from '@/entities/goal';

interface StudyDropDownProps {
  data: StudyListResponse;
  onClick: () => void;
}

export default function StudyDropDown({ onClick, data }: StudyDropDownProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    } catch (err) {
      console.error('goal 리스트 조회 실패:', err);
      // fallback 처리
      router.push(`/dashboard/study/${study.id}`);
    }
    onClick();
  };

  return (
    <div className="border-border-emphasis bg-surface-4 rounded-6 scrollbar-hide flex max-h-346 w-296 flex-col items-center justify-start gap-14 overflow-y-auto border-1 px-13 py-8">
      {data &&
        data.studyList.map((study: StudyItem) => (
          <div
            key={study.id}
            onClick={() => handleClick(study)}
            className="flex h-98 min-h-98 w-full flex-col gap-12 px-11 py-8"
          >
            <h3 className="text-text-secondary title-small">{study.title}</h3>
            <p className="text-text-secondary label-small max-w-264">
              {study.description}
            </p>
          </div>
        ))}
    </div>
  );
}
