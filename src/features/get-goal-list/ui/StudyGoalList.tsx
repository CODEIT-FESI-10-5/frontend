'use client';
import CreateGoalSVG from '@/assets/create-goal.svg';
import { useGetGoal } from '../model/useGetGoal';
import { GoalListItem } from '@/entities/goal';
import { useGoalStore } from '../model/useGoalStore';
import { useStudyStore } from '@/features/get-study-list/model/useStudyStore';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useCreateGoal } from '@/features/create-goal/model';

export default function StudyGoalList() {
  const router = useRouter();
  const { setLastVisitedGoalId, getLastVisitedGoalId } = useGoalStore();
  const { currentStudyId } = useStudyStore();
  const currentGoalId = getLastVisitedGoalId(currentStudyId);

  const mutation = useCreateGoal((newGoal) => {
    setLastVisitedGoalId(currentStudyId, newGoal.id);
    router.push(`/dashboard/study/${currentStudyId}/goal/${newGoal.id}`);
  });

  const { isLoading, data, error } = useGetGoal(Number(currentStudyId));
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  const handleClick = (goal: GoalListItem) => {
    setLastVisitedGoalId(currentStudyId, goal.id);
    router.push(`/dashboard/study/${currentStudyId}/goal/${goal.id}`);
  };

  return (
    <section className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h2 className="text-text-secondary title-small">스터디 목표</h2>
        <CreateGoalSVG
          onClick={() =>
            mutation.mutate({
              title: '스터디 목표를 입력해주세요.',
              studyId: Number(currentStudyId),
            })
          }
        />
      </div>
      {currentStudyId !== null && (
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
                  goalItem.id === currentGoalId
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
