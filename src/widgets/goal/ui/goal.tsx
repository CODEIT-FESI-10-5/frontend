'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

import NewTodoIcon from '@/assets/todo_new.svg';
import EditGoalTitle from '@/features/update-goal-title/ui/update-goal-title';

import Todo from '@/widgets/todo/ui/todo';
import type { Goal } from '@/entities/goal';
import { useGoal } from '@/entities/goal/model/useGoal';

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
      <div className="mb-28 flex flex-col gap-8">
        {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
        <EditGoalTitle title={title} setTitle={setTitle} />
        {/* 왼쪽 텍스트 + 진행도 메시지 */}
        <div className="label-large text-text-primary flex items-center gap-4">
          <span>{goal.studyGoal.completedCt} 완료</span>
          <span className="text-text-tertiary">|</span>
          <span>{getProgressMessage(progress)}</span>
        </div>
      </div>
      {/* Progress 바 */}
      {/* Progress 바와 텍스트를 포함하는 컨테이너 */}
      <div className="relative mb-48 h-28 overflow-hidden rounded-full bg-[#5a5a5a]">
        {/* Animated Progress Fill */}
        <motion.div
          className="to-highlight h-full rounded-full bg-gradient-to-r from-[#ff7333]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: 'easeOut',
          }}
        />
        {/* 진행도 텍스트를 progressBar 위에서 진행도에 따라 위치 */}
        {/*TODO 표시 할 공간이 없을때 어떤식으로 할지 */}
        <div
          className="label-large pointer-events-none absolute top-1/2 -translate-y-1/2 transform text-white"
          style={{ left: `calc(${progress / 2}%)` }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      {/* Todo List 리스트 항목 추가 */}
      <div className="flex flex-col gap-32">
        {/*최근 완료된 투두 */}
        <div className="flex flex-col gap-12">
          <span className="title-medium text-white">최근 완료된 투두</span>
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
          <span className="title-medium text-white">진행중인 투두</span>
          {/* order 순서가 가장 높은(숫자가 낮음) 투두*/}
          {goal.studyGoal.mytodoList
            .filter((todo) => todo.completed === false)
            .sort((a, b) => a.order - b.order)
            .slice(0, 1)
            .map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </div>
      </div>
      <Link href="/goal/todolist">
        <span className="text-text-secondary body-medium mt-28 flex items-center justify-center">
          전체 보기
        </span>
      </Link>
    </>
  );
}
