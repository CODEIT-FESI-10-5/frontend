'use client';
import CreateGoalSVG from '../../../../../public/assets/create-goal.svg';
import { useGetGoalQuery } from '../model/useGetGoalQuery';
import { Goal } from '@/entities/goal';
import { useGoalStore } from '../model/useGoalStore';
import { useStudyStore } from '../../study/model/useStudyStore';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useCreateGoalMutation } from '@/features/sidebar/goal/model/useCreateGoalMutation';

export default function StudyGoalList() {
  const router = useRouter();
  const { setLastVisitedGoalId, getLastVisitedGoalId } = useGoalStore();
  const { currentStudyId } = useStudyStore();
  const currentGoalId = getLastVisitedGoalId(currentStudyId);

  const mutation = useCreateGoalMutation((newGoal) => {
    console.log('clicked');
    setLastVisitedGoalId(currentStudyId, newGoal.id);
    router.push(`/dashboard/${currentStudyId}/goal/${newGoal.id}`);
  });

  const { isLoading, data, error } = useGetGoalQuery();
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  const handleClick = (goal: Goal) => {
    setLastVisitedGoalId(currentStudyId, goal.id);
  };

  return (
    <section className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h2 className="text-text-secondary body-large">스터디 목표</h2>
        <CreateGoalSVG onClick={() => mutation.mutate()} />
      </div>

      <ul className="py-4">
        {data.goalList.map((goal: Goal) => (
          <li
            onClick={() => handleClick(goal)}
            key={goal.id}
            className={clsx(
              'bg-surface-2 rounded-4 h-36 w-full px-12 py-7',
              goal.id === currentGoalId && 'bg-surface-4 text-text-secondary',
            )}
          >
            <h3 className="text-text-tertiary flex items-center">
              {goal.title}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
