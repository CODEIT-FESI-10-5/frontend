'use client';
import CreateGoalSVG from '@/assets/create-goal.svg';
import { useGetGoal } from '../../../entities/goal/model/useGetGoal';
import { GoalListItem, goalQueryKeys } from '@/entities/goal';
import { useRouter, usePathname, useParams } from 'next/navigation';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateGoal } from '@/features/create-goal/model';

export default function StudyGoalList() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const studyId = params?.studyId;
  const goalId = params?.goalId;
  // 목표 생성
  const mutation = useCreateGoal((newGoal) => {
    queryClient.invalidateQueries({
      queryKey: goalQueryKeys.list(Number()),
    });
    router.push(`/dashboard/study/${studyId}/goal/${newGoal.id}`);
  });
  const { isLoading, data, error } = useGetGoal(Number(studyId));

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  // 목표 이동
  const handleClick = (goal: GoalListItem) => {
    if (pathname === '/note') {
      router.push(`/note?studyGoalId=${goal.id}`);
    } else {
      router.push(`/dashboard/study/${data.studyId}/goal/${goal.id}`);
    }
  };

  return (
    <section className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h2 className="text-text-secondary title-small">스터디 목표</h2>
        <CreateGoalSVG
          onClick={() =>
            mutation.mutate({
              title: '스터디 목표를 입력해주세요.',
              studyId: Number(data.studyId),
            })
          }
        />
      </div>
      {studyId != null && (
        <ul className="py-4">
          {data.goals.map((goal) => {
            const goalItem: GoalListItem = {
              id: String(goal.id),
              title: String(goal.title),
            };
            return (
              <li
                onClick={() => handleClick(goalItem)}
                key={goalItem.id}
                className={clsx(
                  'rounded-4 body-medium h-36 w-full px-12 py-7',
                  goalItem.id === goalId
                    ? 'bg-surface-4 text-text-secondary'
                    : 'bg-surface-2 text-text-tertiary',
                )}
              >
                <h3 className="flex items-center">{goalItem.title}</h3>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
