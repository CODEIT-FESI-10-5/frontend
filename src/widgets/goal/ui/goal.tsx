'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

import NewTodoIcon from '@/assets/todo_new.svg';
import EditGoalTitle from '@/features/update-goal-title/ui/update-goal-title';

import Todo from '@/widgets/todo/ui/todo';
import type { Goal } from '@/entities/goal';
import { useGoal } from '@/entities/goal/model/useGoal';

// 팀원별 진행도 타입
export interface TeamProgress {
  name: string; // 팀원 이름
  image: string; // 프로필 이미지
  progress: number; // 진행도 % (40)
  completedCt: number[]; // todo 완료 횟수 (4/8)
}

/**
 * mytodoList의 completed 상태를 기반으로 진행도를 계산
 */

function calculateProgress(mytodoList: { completed: boolean }[]) {
  const totalTodos = mytodoList.length;
  const completedTodos = mytodoList.filter((todo) => todo.completed).length;
  return totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
}

export default function Goal({
  studyId,
  goalId,
}: {
  studyId: string;
  goalId: string;
}) {
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

  const { data: goal, isLoading, error } = useGoal(studyId, goalId);
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
  if (title === '' && goal.studyGoal.title) {
    setTitle(goal.studyGoal.title);
  }

  const progress = calculateProgress(goal.studyGoal.mytodoList);

  if (goal.studyGoal.mytodoList.length === 0) {
    if (!title) {
      return <EditGoalTitle title={title} setTitle={setTitle} />;
    }
    return (
      <>
        <EditGoalTitle title={title} setTitle={setTitle} />
        <Link
          href="/goal/todo/create"
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
            <EditGoalTitle title={title} setTitle={setTitle} />
            {/* 왼쪽 텍스트 + 진행도 메시지 */}
            <div className="label-small text-text-primary flex items-center gap-4">
              <span>{goal.studyGoal.completedCt} 완료</span>
              <span className="text-text-tertiary">|</span>
              <span>{getProgressMessage(progress)}</span>
            </div>
          </div>
          {/* Progress 바 */}
          {/* Progress 바와 텍스트를 포함하는 컨테이너 */}
          <div className="mb-48 h-28 overflow-hidden rounded-full bg-[#5a5a5a]">
            <motion.div
              className="to-highlight relative h-full rounded-full bg-gradient-to-r from-[#ff7333]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(progress, 10)}%` }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: 'easeOut',
              }}
              style={{ minWidth: '10%' }}
            >
              <div className="body-small pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                {Math.round(progress)}%
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
              {goal.studyGoal.mytodoList
                .filter((todo) => todo.completed)
                .sort(
                  (a, b) =>
                    (b.completedAt ? new Date(b.completedAt).getTime() : 0) -
                    (a.completedAt ? new Date(a.completedAt).getTime() : 0),
                )
                .slice(0, 1)
                .map((todo) => (
                  <Todo key={todo.id} todo={todo} />
                ))}
            </div>
            {/*진행중인 투두 */}
            <div className="flex flex-col gap-12">
              <span className="body-medium font-medium text-white">
                진행중인 투두
              </span>
              {/* studyGoal.order 배열 순서대로 미완료 투두를 정렬하여 첫 번째만 표시 */}
              {(() => {
                const order = goal.studyGoal.order;
                const todoMap = new Map(
                  goal.studyGoal.mytodoList.map((todo) => [todo.id, todo]),
                );
                const orderedTodos = order
                  .map((id) => todoMap.get(id))
                  .filter((todo) => todo && todo.completed === false);
                return orderedTodos
                  .slice(0, 1)
                  .map((todo) =>
                    todo ? <Todo key={todo.id} todo={todo} /> : null,
                  );
              })()}
            </div>
          </div>
          <Link href="/todolist-detail">
            <span className="text-text-secondary body-medium mt-28 flex items-center justify-center">
              전체 보기
            </span>
          </Link>
        </div>
        {/* 팀원 진행도 */}
        <div className="bg-surface-2 border-border-subtle h-[523px] w-full max-w-[537px] rounded-md border p-34">
          <span className="body-medium font-medium text-white">
            팀원 진행도
          </span>
          {/* 팀원별 진행도 컴포넌트 */}
          <TeamProgressList teamProgress={goal.studyGoal.teamProgress || []} />
        </div>
      </div>
    </>
  );
}

// 팀 진행도 컴포넌트
export function TeamProgressList({
  teamProgress,
}: {
  teamProgress: TeamProgress[];
}) {
  // 내림차순 정렬 (진행도 높은 순)
  const sorted = [...teamProgress].sort((a, b) => b.progress - a.progress);
  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-text-primary body-medium font-bold">
          팀원 달성률
        </span>
        <span className="text-xs text-gray-400">5분전 업데이트</span>
      </div>
      <ul className="flex h-[320px] w-full items-end gap-6">
        {sorted.map((member, idx) => {
          // 1등 강조 스타일
          const isFirst = idx === 0;
          // 바 색상
          const barColor = isFirst
            ? 'bg-[#2D3BA6]'
            : idx === 2
              ? 'bg-[#FF8A3D]'
              : 'bg-[#6B6B6B]';
          // 텍스트 색상
          const textColor = isFirst
            ? 'text-[#2D3BA6]'
            : idx === 2
              ? 'text-[#FF8A3D]'
              : 'text-[#6B6B6B]';
          // 진행도 바 높이 (최소 80, 최대 200)
          const barHeight = 80 + (member.progress / 100) * 120;
          // 순위 텍스트
          let rankText = `${idx + 1}위`;
          if (isFirst) rankText = '1위';
          if (idx === 2) rankText = `3위(나)`;
          return (
            <li key={member.name} className="flex w-1/5 flex-col items-center">
              <span className="mb-2 max-w-[60px] truncate text-center text-xs text-white">
                {member.name}
              </span>
              <div className="relative mb-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`h-52 w-52 rounded-full border-2 object-cover ${isFirst ? 'border-[#2D3BA6]' : 'border-[#444]'}`}
                />
              </div>
              <motion.div
                className={`flex flex-col items-center justify-end ${barColor} relative w-64 rounded-t-lg`}
                initial={{ height: 80 }}
                animate={{ height: barHeight }}
                transition={{ duration: 1 }}
              >
                <span className="mb-1 text-sm font-bold text-white">
                  {member.progress}%
                </span>
              </motion.div>
              <span
                className={`mt-2 text-xs font-bold ${isFirst ? 'text-[#2D3BA6]' : idx === 2 ? 'text-[#FF8A3D]' : 'text-[#6B6B6B]'}`}
              >
                {rankText}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
