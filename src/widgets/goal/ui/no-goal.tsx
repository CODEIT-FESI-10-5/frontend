'use client';

import CreateGoalIcon from '@/assets/create-goal.svg';
import { useCreateGoal } from '@/features/create-goal/model';
import { goalQueryKeys } from '@/entities/goal';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useStudyStore } from '@/features/get-study-list/model';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';

export default function NoGoal() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { role } = useStudyRoleStore();
  const { currentStudyId } = useStudyStore();

  // 목표 생성
  const mutation = useCreateGoal((newGoal) => {
    queryClient.invalidateQueries({
      queryKey: goalQueryKeys.list(Number(currentStudyId)),
    });
    router.push(`/dashboard/study/${currentStudyId}/goal/${newGoal.id}`);
  });

  const handleCreateGoal = () => {
    if (role === true && currentStudyId) {
      mutation.mutate({
        title: '스터디 목표를 입력해주세요.',
        studyId: Number(currentStudyId),
      });
    }
  };

  return (
    <div className="flex flex-col gap-16 md:gap-27 not-only-of-type:md:flex-row">
      <div className="bg-surface-2 border-border-subtle h-[300px] w-full rounded-lg border md:h-[523px] md:p-34">
        <div className="text-text-secondary flex h-full flex-col items-center justify-center gap-14">
          {/*todo featue 공용 create-goal 로 대체 */}
          {role === true ? (
            <>
              <CreateGoalIcon
                className="cursor-pointer"
                onClick={handleCreateGoal}
              />
              <span className="md:body-medium m-body-medium text-text-secondary">
                스터디 목표를 추가해 주세요.
              </span>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center">
                <span className="text-text-tertiary md:body-medium m-body-medium">
                  스터디장이 스터디 목표를 설정 중이에요.
                </span>
                <span className="text-text-tertiary md:body-medium m-body-medium">
                  조금만 기다려 주세요!
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
