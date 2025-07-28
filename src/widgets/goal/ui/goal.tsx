'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

import NewTodoIcon from '@/assets/todo_new.svg';
import EditGoalTitle from '@/features/update-goal-title/ui/update-goal-title';

import Todo from '@/widgets/todo/ui/todo';
import Image from 'next/image';
import { teamProgress, useDashboard } from '@/entities/dashboard';

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
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-white">대시보드 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">
          대시보드를 불러오는 중 에러가 발생했습니다:{' '}
          {error instanceof Error ? error.message : '알 수 없는 에러'}
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">대시보드를 찾을 수 없습니다.</div>
      </div>
    );
  }

  // goal이 정의된 이후에만 studyGoal 접근
  // 제목 상태 초기화 (최초 렌더링 시만)
  if (title === '' && goal.title) {
    setTitle(goal.title);
  }

  if (!goal?.recentCompletedTodo?.content && !goal?.inProgressTodo?.content) {
    if (!title) {
      return (
        <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
      );
    }
    return (
      <>
        <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
        <Link
          href={`/todolist-detail/${goalId}`}
          className="mt-28 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#454545] bg-[#2c2c2c] p-8 py-36 text-base font-normal text-[#f5f5f5]"
        >
          <NewTodoIcon width={32} height={32} />
          <span className="text-text-primary body-small">
            세부 투두를 추가해 목표를 구체화해보세요.
          </span>
        </Link>
      </>
    );
  }

  //Todo 리스트 있을때
  return (
    <>
      <div className="flex gap-27">
        <div className="bg-surface-2 border-border-subtle h-[523px] w-full max-w-[537px] rounded-md border p-34">
          <div className="mb-28 flex flex-col gap-8">
            {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
            <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
            {/* 왼쪽 텍스트 + 진행도 메시지 */}
            <div className="label-small text-text-primary flex items-center gap-4">
              <span>{goal.completedCt} 완료</span>
              <span className="text-text-tertiary">|</span>
              <span>{getProgressMessage(goal.progress)}</span>
            </div>
          </div>
          {/* Progress 바 */}
          {/* Progress 바와 텍스트를 포함하는 컨테이너 */}
          <div className="mb-48 h-28 overflow-hidden rounded-full bg-[#5a5a5a]">
            <motion.div
              className="to-highlight relative h-full rounded-full bg-gradient-to-r from-[#ff7333]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(goal.progress, 10)}%` }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: 'easeOut',
              }}
              style={{ minWidth: '10%' }}
            >
              <div className="body-small pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                {Math.round(goal.progress)}%
              </div>
            </motion.div>
          </div>
          {/* Todo List 리스트 항목 추가 */}
          <div className="flex flex-col gap-32">
            {/*최근 완료된 투두 */}
            <div className="flex flex-col gap-12">
              <span className="body-medium font-medium text-white">
                최근 완료된 투두
              </span>
              {/* 가장 최근 완료된 투두를 정렬 후 todo 컴포넌트 넣음 */}
              {goal?.recentCompletedTodo?.content ? (
                <Todo todo={goal.recentCompletedTodo} />
              ) : (
                <span className="text-text-secondary body-medium">
                  최근 완료된 투두가 없습니다.
                </span>
              )}
            </div>
            {/*진행중인 투두 */}
            <div className="flex flex-col gap-12">
              <span className="body-medium font-medium text-white">
                진행중인 투두
              </span>
              {goal?.inProgressTodo?.content ? (
                <Todo todo={goal.inProgressTodo} />
              ) : (
                <span className="text-text-secondary body-medium">
                  진행중인 투두가 없습니다.
                </span>
              )}
            </div>
          </div>
          <Link href={`/todolist-detail/${goalId}`}>
            <span className="text-text-secondary body-medium mt-28 flex items-center justify-center">
              전체 보기
            </span>
          </Link>
        </div>
        {/* 팀원 진행도 */}
        <div className="bg-surface-2 border-border-subtle h-[380px] w-full max-w-[423px] rounded-md border p-34">
          {/* 팀원별 진행도 컴포넌트 */}
          <TeamProgressList teamProgress={goal.teamProgress || []} />
        </div>
      </div>
    </>
  );
}

// 팀 진행도 컴포넌트
export function TeamProgressList({
  teamProgress,
}: {
  teamProgress: teamProgress[];
}) {
  // 내림차순 정렬 (진행도 높은 순)
  const sorted = [...teamProgress].sort((a, b) => b.progress - a.progress);
  // 최대 4명만 출력, 부족하면 빈 슬롯 추가
  const maxMembers = 4;
  const filled = sorted.slice(0, maxMembers);
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="headline-medium text-white">팀원 달성률</span>
        {/* TODO 시간 추가해야됨 */}
        <span className="label-small text-text-tertiary">5분전 업데이트</span>
      </div>
      <ul className="flex h-full w-full items-end justify-between">
        {Array.from({ length: maxMembers }).map((_, idx) => {
          const member = filled[idx];
          const isFirst = idx === 0;
          const barColor = isFirst
            ? 'bg-secondary'
            : idx === 2
              ? 'bg-highlight'
              : 'bg-icon-grey-300';
          const barHeight = member ? 22 + (member.progress / 100) * 98 : 22;
          const rankText = `${idx + 1}위`;
          if (member) {
            return (
              <li
                key={member.name}
                className="relative flex flex-col items-center gap-6"
              >
                <div className="mb-10 flex flex-col items-center justify-center gap-10">
                  <span className="label-small text-text-secondary max-w-[60px] truncate">
                    {member.name}
                  </span>
                  <Image
                    width={52}
                    height={52}
                    src={member.image}
                    alt={member.name}
                    className={`border-icon-grey-200 rounded-full border-4 object-cover`}
                  />
                </div>
                <motion.div
                  className={`bottom-0 flex flex-col items-center justify-end ${barColor} relative w-64 rounded-t-md`}
                  initial={{ height: 22 }}
                  animate={{ height: barHeight }}
                  transition={{ duration: 1 }}
                >
                  {isFirst && (
                    <Image
                      width={35}
                      height={35}
                      src={'/images/teamprogress-first.png'}
                      alt="1st place"
                      className="absolute top-0 left-1/2 -translate-x-1/2"
                    />
                  )}
                  <span className="body-small absolute bottom-3 text-white">
                    {member.progress}%
                  </span>
                </motion.div>
                <span className={`body-medium text-text-primary`}>
                  {rankText}
                </span>
              </li>
            );
          } else {
            // 빈 슬롯
            return (
              <li
                key={`empty-${idx}`}
                className="relative flex flex-col items-center gap-6"
              >
                <div className="mb-10 flex flex-col items-center justify-center gap-10">
                  <span className="label-small max-w-[60px] truncate text-transparent select-none">
                    -
                  </span>
                  <div className="border-icon-grey-200 bg-icon-grey-300 h-52 w-52 rounded-full border-4" />
                </div>
                <motion.div
                  className={`bg-icon-grey-300 relative bottom-0 flex w-64 flex-col items-center justify-end rounded-t-md`}
                  initial={{ height: 22 }}
                  animate={{ height: 22 }}
                  transition={{ duration: 1 }}
                >
                  <span className="body-small absolute bottom-3 text-white">
                    0%
                  </span>
                </motion.div>
                <span className={`body-medium text-text-primary`}>
                  {rankText}
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
