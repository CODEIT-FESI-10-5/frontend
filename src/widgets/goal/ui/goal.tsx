'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import NewTodoIcon from '@/assets/todo_new.svg';
import EditGoalTitle from '@/features/update-goal-title/ui/update-goal-title';

import Todo from '@/widgets/todo/ui/TodoCard';

import { useDashboard } from '@/entities/dashboard';
import { cn } from '@/shared/lib/utils/cn';
import TeamProgress from './TeamProgress';

export default function Goal({ goalId }: { goalId: string }) {
  // 진행도 메시지 관리 변수
  const getProgressMessage = (progress: number) => {
    if (progress < 10) return '';
    if (progress < 30) return '시작이 좋아요!';
    if (progress < 50) return '계속 가볼까요?';
    if (progress < 70) return '이 흐름을 잃지 않는게 중요해요.';
    if (progress < 90) return '꾸준함이 인상적이에요.';
    if (progress < 100) return '거의 다 왔어요!';
    return '축하해요! 목표를 완료했어요.';
  };

  const { data: goal, isLoading, error } = useDashboard(goalId);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
    }
  }, [goal]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    // 404 페이지로 리다이렉트
    notFound();
  }

  if (!goal) {
    // 404 페이지로 리다이렉트
    notFound();
  }

  if (!goal?.recentCompletedTodo?.content && !goal?.inProgressTodo?.content) {
    if (!title) {
      return (
        <div
          className={cn(
            'flex min-w-0 flex-col gap-16',
            '',
            'md:flex-row md:gap-27',
          )}
        >
          <div
            className={cn(
              'bg-surface-2 border-border-subtle w-full min-w-0 rounded-lg border',
              'h-[200px] px-18 py-26',
              'md:h-[523px] md:max-w-[537px] md:p-34',
            )}
          >
            <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
          </div>
          {/* 팀원 진행도 */}
          {/* 팀원별 진행도 컴포넌트 */}
          <TeamProgress teamProgress={goal.teamProgress || []} />
        </div>
      );
    }
    return (
      <div
        className={cn(
          'flex min-w-0 flex-col gap-16',
          '',
          'md:flex-row md:gap-27',
        )}
      >
        <div
          className={cn(
            'bg-surface-2 border-border-subtle w-full min-w-0 rounded-lg border',
            'h-[200px] px-18 py-26',
            'md:h-[523px] md:max-w-[537px] md:p-34',
          )}
        >
          <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
          <Link
            href={`/todolist-detail/${goalId}`}
            className={cn(
              'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#454545] bg-[#2c2c2c] text-base font-normal text-[#f5f5f5]',
              'mt-20 px-18 py-24',
              'md:mt-28',
            )}
          >
            <NewTodoIcon width={32} height={32} />
            <span
              className={cn(
                'text-text-primary text-nowrap',
                'm-body-large',
                'md:body-small',
              )}
            >
              세부 투두를 추가해 목표를 구체화해보세요.
            </span>
          </Link>
        </div>
        {/* 팀원 진행도 */}

        {/* 팀원별 진행도 컴포넌트 */}
        <TeamProgress teamProgress={goal.teamProgress || []} />
      </div>
    );
  }

  //Todo 리스트 있을때
  return (
    <>
      <div
        className={cn(
          'flex min-w-0 flex-col gap-16',
          '',
          'md:flex-row md:gap-27',
        )}
      >
        <div
          className={cn(
            'bg-surface-2 border-border-subtle w-full min-w-0 rounded-lg border',
            'px-18 py-26',
            'md:max-w-[537px] md:p-34',
          )}
        >
          <div className={cn('mb-28 flex flex-col gap-8')}>
            {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
            <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
            {/* 왼쪽 텍스트 + 진행도 메시지 */}
            <div
              className={cn(
                'text-text-primary flex items-center gap-4',
                'm-label-small',
                'md:label-small',
              )}
            >
              <span>{goal.completedCt} 완료</span>
              <span className={cn('text-text-tertiary')}>|</span>
              <span>{getProgressMessage(goal.progress)}</span>
            </div>
          </div>
          {/* Progress 바 */}
          {/* Progress 바와 텍스트를 포함하는 컨테이너 */}
          <div
            className={cn(
              'overflow-hidden rounded-full bg-[#5a5a5a]',
              'mb-32 h-23',
              'md:mb-48 md:h-28',
            )}
          >
            <motion.div
              className={cn(
                'to-highlight relative h-full rounded-full bg-gradient-to-r from-[#ff7333]',
              )}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(goal.progress, 10)}%` }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: 'easeOut',
              }}
              style={{ minWidth: '10%' }}
            >
              <div
                className={cn(
                  'pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white',
                  'm-label-medium',
                  'md:body-small',
                )}
              >
                {Math.round(goal.progress)}%
              </div>
            </motion.div>
          </div>
          {/* Todo List 리스트 항목 추가 */}
          <div className={cn('flex min-w-0 flex-col', 'gap-20', 'md:gap-32')}>
            {/*최근 완료된 투두 */}
            <div className={cn('flex min-w-0 flex-col gap-12')}>
              <span className={cn('font-medium text-white', 'body-medium', '')}>
                최근 완료된 투두
              </span>
              {/* 가장 최근 완료된 투두를 정렬 후 todo 컴포넌트 넣음 */}
              <motion.div
                key={goal?.recentCompletedTodo?.id || 'empty-completed'}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {goal?.recentCompletedTodo?.content ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Todo todo={goal.recentCompletedTodo} />
                  </motion.div>
                ) : (
                  <span
                    className={cn('text-text-secondary', 'body-medium', '')}
                  >
                    최근 완료된 투두가 없습니다.
                  </span>
                )}
              </motion.div>
            </div>
            {/*진행중인 투두 */}
            <div className={cn('flex min-w-0 flex-col gap-12')}>
              <span className={cn('font-medium text-white', 'body-medium', '')}>
                진행중인 투두
              </span>
              <motion.div
                key={goal?.inProgressTodo?.id || 'empty-progress'}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {goal?.inProgressTodo?.content ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Todo todo={goal.inProgressTodo} inProgress={true} />
                  </motion.div>
                ) : (
                  <span
                    className={cn('text-text-secondary', 'body-medium', '')}
                  >
                    진행중인 투두가 없습니다.
                  </span>
                )}
              </motion.div>
            </div>
          </div>
          <Link href={`/todolist-detail/${goalId}`}>
            <span
              className={cn(
                'text-text-secondary flex items-center justify-center',
                'm-body-small mt-20',
                'md:body-medium md:mt-28',
              )}
            >
              전체 보기
            </span>
          </Link>
        </div>
        {/* 팀원 진행도 */}

        {/* 팀원별 진행도 컴포넌트 */}
        <TeamProgress teamProgress={goal.teamProgress || []} />
      </div>
    </>
  );
}
