'use client';

import { motion } from 'framer-motion';
import { useProfileStore } from '@/features/auth-login/model/useProfileStore';
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
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-white">대시보드 로딩 중...</div>
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
        <div className="flex flex-col gap-16 md:flex-row md:gap-27">
          <div className="bg-surface-2 border-border-subtle h-[203px] w-full max-w-[537px] rounded-lg border px-18 py-26 md:h-[523px] md:p-34">
            <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
          </div>
          {/* 팀원 진행도 */}
          {/* 팀원별 진행도 컴포넌트 */}
          <TeamProgressList teamProgress={goal.teamProgress || []} />
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-16 md:flex-row md:gap-27">
        <div className="bg-surface-2 border-border-subtle h-[203px] w-full max-w-[537px] rounded-lg border px-18 py-26 md:h-[523px] md:p-34">
          <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
          <Link
            href={`/todolist-detail/${goalId}`}
            className="mt-20 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#454545] bg-[#2c2c2c] px-18 py-24 text-base font-normal text-[#f5f5f5] md:mt-28"
          >
            <NewTodoIcon width={32} height={32} />
            <span className="text-text-primary m-body-large md:body-small">
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
      <div className="flex min-w-0 flex-col gap-16 md:flex-row md:gap-27">
        <div className="bg-surface-2 border-border-subtle w-full min-w-0 rounded-lg border px-18 py-26 md:max-w-[537px] md:p-34">
          <div className="mb-28 flex flex-col gap-8">
            {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
            <EditGoalTitle goalId={goalId} title={title} setTitle={setTitle} />
            {/* 왼쪽 텍스트 + 진행도 메시지 */}
            <div className="m-label-small md:label-small text-text-primary flex items-center gap-4">
              <span>{goal.completedCt} 완료</span>
              <span className="text-text-tertiary">|</span>
              <span>{getProgressMessage(goal.progress)}</span>
            </div>
          </div>
          {/* Progress 바 */}
          {/* Progress 바와 텍스트를 포함하는 컨테이너 */}
          <div className="mb-32 h-23 overflow-hidden rounded-full bg-[#5a5a5a] md:mb-48 md:h-28">
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
              <div className="m-label-medium md:body-small pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                {Math.round(goal.progress)}%
              </div>
            </motion.div>
          </div>
          {/* Todo List 리스트 항목 추가 */}
          <div className="flex min-w-0 flex-col gap-20 md:gap-32">
            {/*최근 완료된 투두 */}
            <div className="flex min-w-0 flex-col gap-12">
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
            <div className="flex min-w-0 flex-col gap-12">
              <span className="body-medium font-medium text-white">
                진행중인 투두
              </span>
              {goal?.inProgressTodo?.content ? (
                <Todo todo={goal.inProgressTodo} inProgress={true} />
              ) : (
                <span className="text-text-secondary body-medium">
                  진행중인 투두가 없습니다.
                </span>
              )}
            </div>
          </div>
          <Link href={`/todolist-detail/${goalId}`}>
            <span className="text-text-secondary m-body-small md:body-medium mt-20 flex items-center justify-center md:mt-28">
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
  const myName = useProfileStore((state) => state.name);

  if (teamProgress.length === 0) {
    return (
      <div className="bg-surface-3 border-border-subtle flex h-[204px] w-full flex-col gap-18 rounded-lg border px-18 py-26 md:max-w-[423px] md:px-30 md:py-34">
        <span className="m-headline-medium md:headline-medium text-text-secondary">
          팀원 달성률
        </span>
        <div className="flex flex-col items-center justify-center gap-24">
          <span className="m-label-small md:label-small text-text-secondary text-center">
            같이 하면 더 힘이나요.
            <br />
            팀원을 초대해 함께 목표를 이뤄볼까요?
          </span>
          <div className="relative flex items-center gap-8">
            <div className="bg-surface-4 text-primary title-medium border-border-emphasis rounded border">
              <span className="px-20 py-8">{inviteCode}</span>
              <button
                className="bg-primary m-body-small md:body-medium cursor-pointer rounded-sm px-16 py-10 text-nowrap text-white"
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
    <div className="bg-surface-2 border-border-subtle h-[380px] w-full rounded-md border px-16 py-26 md:max-w-[423px] md:p-34">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="m-headline-medium md:headline-medium text-white">
            팀원 달성률
          </span>
          {/* <span className="label-small text-text-tertiary">5분전 업데이트</span> */}
        </div>
        <ul className="flex h-full w-full items-end justify-around md:justify-between">
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
                  className="relative flex flex-col items-center gap-6"
                >
                  <div className="mb-10 flex flex-col items-center justify-center gap-10">
                    <span className="label-small text-text-secondary max-w-[60px] truncate">
                      {member.name}
                    </span>
                    <Image
                      width={52}
                      height={52}
                      src={member.image || '/images/default-profile.png'}
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
    </div>
  );
}
