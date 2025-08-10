'use client';
import { useGetGoal } from '@/entities/goal/model/useGetGoal';
import { GoalListItem } from '@/entities/goal';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useGoalStore } from '../model';
import { useStudyStore } from '@/features/get-study-list/model';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import { useDrawerStore } from '@/shared/model';
import CreateGoalButton from '@/features/create-goal/ui/CreateGoalButton';
import DeleteGoalButton from '@/features/delete-goal/ui/deleteGoalButton';

export default function StudyGoalList() {
  const router = useRouter();
  const pathname = usePathname();
  const { close } = useDrawerStore();
  const { role } = useStudyRoleStore();
  const { currentGoalId, setGoalId } = useGoalStore();
  const { currentStudyId } = useStudyStore();

  const { isLoading, data, error } = useGetGoal(Number(currentStudyId));

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  // 목표 이동
  const handleClick = (goal: GoalListItem) => {
    if (pathname === '/note') {
      setGoalId(goal.id);
      close();
      router.push(`/note?goalId=${goal.id}`);
    } else {
      close();
      router.push(`/dashboard/study/${currentStudyId}/goal/${goal.id}`);
    }
  };

  return (
    <section className="mt-64 flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h2 className="text-text-secondary title-small">스터디 목표</h2>
        {role && currentStudyId != null && (
          <CreateGoalButton studyId={data.studyId} />
        )}
      </div>
      {data.totalCount !== 0 ? (
        <ul className="cursor-pointer py-4">
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
                  'rounded-4 body-medium flex h-36 w-full items-center justify-between px-12 py-7',
                  goalItem.id === currentGoalId
                    ? 'bg-surface-4 text-text-secondary'
                    : 'bg-surface-2 text-text-tertiary',
                )}
              >
                <h3 className="flex items-center">{goalItem.title}</h3>
                {role && goalItem.id === currentGoalId && (
                  <div className="ml-auto">
                    <DeleteGoalButton
                      goalId={goalItem.id}
                      studyId={String(data.studyId)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-text-secondary label-small">
          스터디 목표가 없습니다.
        </p>
      )}
    </section>
  );
}
