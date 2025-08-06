'use client';

import { useStudyStore } from '@/features/get-study-list/model';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import CreateGoalButton from '@/features/create-goal/ui/CreateGoalButton';
import { cn } from '@/shared/lib/utils/cn';

export default function NoGoal() {
  const { role } = useStudyRoleStore();
  const { currentStudyId } = useStudyStore();

  return (
    <div
      className={cn(
        'flex flex-col gap-16 not-only-of-type:md:flex-row',
        'md:gap-27',
      )}
    >
      <div
        className={cn(
          'bg-surface-2 border-border-subtle h-[300px] w-full rounded-lg border',
          'md:h-[523px] md:p-34',
        )}
      >
        <div
          className={cn(
            'text-text-secondary flex h-full flex-col items-center justify-center gap-14',
          )}
        >
          {/*todo featue 공용 create-goal 로 대체 */}
          {role === true ? (
            <>
              <CreateGoalButton studyId={Number(currentStudyId)} />
              <span
                className={cn(
                  'text-text-secondary',
                  'm-body-medium',
                  'md:body-medium',
                )}
              >
                스터디 목표를 추가해 주세요.
              </span>
            </>
          ) : (
            <>
              <div className={cn('flex flex-col items-center justify-center')}>
                <span
                  className={cn(
                    'text-text-tertiary',
                    'm-body-medium',
                    'md:body-medium',
                  )}
                >
                  스터디장이 스터디 목표를 설정 중이에요.
                </span>
                <span
                  className={cn(
                    'text-text-tertiary',
                    'm-body-medium',
                    'md:body-medium',
                  )}
                >
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
