'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import NewTodoIcon from '@/assets/todo_new.svg';
import EditGoalTitle from '@/features/update-goal-title/ui/update-goal-title';

import Todo from '@/widgets/todo/ui/TodoCard';
import Image from 'next/image';
import {
  teamProgress,
  useDashboard,
  useInviteCodeStore,
} from '@/entities/dashboard';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils/cn';

// 팀원별 진행도 타입
export interface TeamProgress {
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
  progress: number; // 진행도 % (40)
  completedCt: number[]; // todo 완료 횟수 (4/8)
}

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
    return (
      <div className={cn('flex h-full items-center justify-center')}>
        <div className={cn('text-white', 'text-lg', '')}>
          대시보드 로딩 중...
        </div>
      </div>
    );
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
          <TeamProgressList teamProgress={goal.teamProgress || []} />
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
        <TeamProgressList teamProgress={goal.teamProgress || []} />
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
              {goal?.recentCompletedTodo?.content ? (
                <Todo todo={goal.recentCompletedTodo} />
              ) : (
                <span className={cn('text-text-secondary', 'body-medium', '')}>
                  최근 완료된 투두가 없습니다.
                </span>
              )}
            </div>
            {/*진행중인 투두 */}
            <div className={cn('flex min-w-0 flex-col gap-12')}>
              <span className={cn('font-medium text-white', 'body-medium', '')}>
                진행중인 투두
              </span>
              {goal?.inProgressTodo?.content ? (
                <Todo todo={goal.inProgressTodo} inProgress={true} />
              ) : (
                <span className={cn('text-text-secondary', 'body-medium', '')}>
                  진행중인 투두가 없습니다.
                </span>
              )}
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
        <TeamProgressList teamProgress={goal.teamProgress || []} />
      </div>
    </>
  );
}

// 팀 진행도 컴포넌트

// 팀원이 없을 때 안내 UI 추가
export function TeamProgressList({
  teamProgress,
}: {
  teamProgress: teamProgress[];
}) {
  const { inviteCode } = useInviteCodeStore();
  const myName = localStorage.getItem('nickname');

  if (teamProgress.length === 0) {
    return (
      <div
        className={cn(
          'bg-surface-3 border-border-subtle flex flex-col rounded-lg border',
          'h-[204px] w-full gap-18 px-18 py-26',
          'md:max-w-[423px] md:px-30 md:py-34',
        )}
      >
        <span
          className={cn(
            'text-text-secondary',
            'm-headline-medium',
            'md:headline-medium',
          )}
        >
          팀원 달성률
        </span>
        <div className={cn('flex flex-col items-center justify-center gap-24')}>
          <span
            className={cn(
              'text-text-secondary text-center',
              'm-label-small',
              'md:label-small',
            )}
          >
            같이 하면 더 힘이나요.
            <br />
            팀원을 초대해 함께 목표를 이뤄볼까요?
          </span>
          <div className={cn('relative flex items-center gap-8')}>
            <div
              className={cn(
                'bg-surface-4 text-primary border-border-emphasis rounded border',
                'title-medium',
                '',
              )}
            >
              <span className={cn('px-20 py-8')}>{inviteCode}</span>
              <button
                className={cn(
                  'bg-primary cursor-pointer rounded-sm text-nowrap text-white',
                  'm-body-small px-16 py-10',
                  'md:body-medium',
                )}
                onClick={() => {
                  navigator.clipboard.writeText(String(inviteCode));
                  toast.success('초대 코드가 복사되었습니다!');
                }}
              >
                코드 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 기존 팀원 달성률 UI (팀원이 있을 때)
  // ...existing code...
  // (아래 기존 코드 유지)
  // 내림차순 정렬 (진행도 높은 순)
  const sorted = [...teamProgress].sort((a, b) => b.progress - a.progress);
  const maxMembers = 4;
  const filled = sorted.slice(0, maxMembers);
  return (
    <div
      className={cn(
        'bg-surface-2 border-border-subtle w-full rounded-md border',
        'h-[380px] px-16 py-26',
        'md:max-w-[423px] md:p-34',
      )}
    >
      <div className={cn('flex h-full flex-col justify-between')}>
        <div className={cn('flex items-center justify-between')}>
          <span
            className={cn(
              'text-white',
              'm-headline-medium',
              'md:headline-medium',
            )}
          >
            팀원 달성률
          </span>
          {/* <span className="label-small text-text-tertiary">5분전 업데이트</span> */}
        </div>
        <ul
          className={cn(
            'flex h-full w-full items-end',
            'justify-around',
            'md:justify-between',
          )}
        >
          {Array.from({ length: maxMembers }).map((_, idx) => {
            const member = filled[idx];
            const isFirst = idx === 0;
            // 자기 자신이면 색상 강조
            const isMe = member && member.name === myName;
            const barColor = isMe
              ? 'bg-highlight'
              : isFirst
                ? 'bg-secondary'
                : 'bg-icon-grey-300';
            const barHeight = member ? 22 + (member.progress / 100) * 98 : 22;
            const rankText = `${idx + 1}위`;
            if (member) {
              return (
                <li
                  key={member.name}
                  className={cn('relative flex flex-col items-center gap-6')}
                >
                  <div
                    className={cn(
                      'mb-10 flex flex-col items-center justify-center gap-10',
                    )}
                  >
                    <span
                      className={cn(
                        'text-text-secondary max-w-[60px] truncate',
                        'label-small',
                        '',
                      )}
                    >
                      {member.name}
                    </span>
                    <Image
                      width={52}
                      height={52}
                      src={member.image || '/images/default-profile.png'}
                      alt={member.name}
                      className={cn(
                        'border-icon-grey-200 rounded-full border-4 object-cover',
                      )}
                    />
                  </div>
                  <motion.div
                    className={`bottom-0 flex flex-col items-center justify-end ${barColor} relative w-64 rounded-t-md`}
                    initial={{ height: 22 }}
                    animate={{ height: barHeight }}
                    transition={{ duration: 1 }}
                  >
                    <span
                      className={cn(
                        'absolute bottom-3 text-white',
                        'body-small',
                        '',
                      )}
                    >
                      {member.progress}%
                    </span>
                  </motion.div>
                  <span className={cn('text-text-primary', 'body-medium', '')}>
                    {rankText}
                  </span>
                </li>
              );
            } else {
              // 빈 슬롯
              return (
                <li
                  key={`empty-${idx}`}
                  className={cn('relative flex flex-col items-center gap-6')}
                >
                  <div
                    className={cn(
                      'mb-10 flex flex-col items-center justify-center gap-10',
                    )}
                  >
                    <span
                      className={cn(
                        'max-w-[60px] truncate text-transparent select-none',
                        'label-small',
                        '',
                      )}
                    >
                      -
                    </span>
                    <div
                      className={cn(
                        'border-icon-grey-200 bg-icon-grey-300 rounded-full border-4',
                        'h-52 w-52',
                        '',
                      )}
                    />
                  </div>
                  <motion.div
                    className={cn(
                      'bg-icon-grey-300 relative bottom-0 flex flex-col items-center justify-end rounded-t-md',
                      'w-64',
                      '',
                    )}
                    initial={{ height: 22 }}
                    animate={{ height: 22 }}
                    transition={{ duration: 1 }}
                  >
                    <span
                      className={cn(
                        'absolute bottom-3 text-white',
                        'body-small',
                        '',
                      )}
                    >
                      0%
                    </span>
                  </motion.div>
                  <span className={cn('text-text-primary', 'body-medium', '')}>
                    {rankText}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
