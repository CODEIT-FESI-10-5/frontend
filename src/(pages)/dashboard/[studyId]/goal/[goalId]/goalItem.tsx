'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Goal } from '../model';

import NewTodoIcon from '@/assets/todo_new.svg';
import TodoCard from '@/shared/ui/todoCard';
import EditGoalTitle from '@/features/Update_Goal_Title/ui/Update_Goal_title';
import NavigateTodo from '@/features/Navigate_Todo/ui/navigate_todo';

/**
 * mytodoList의 completed 상태를 기반으로 진행도를 계산
 */

function calculateProgress(mytodoList: { completed: boolean }[]) {
  const totalTodos = mytodoList.length;
  const completedTodos = mytodoList.filter((todo) => todo.completed).length;
  return totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
}

export default function GoalCard({ goal }: { goal: Goal }) {
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
  const [title, setTitle] = useState(goal.studyGoal.title);

  const progress = calculateProgress(goal.studyGoal.mytodoList);

  //Todo 리스트가 없고 제목도 없을때
  if (goal.studyGoal.mytodoList.length === 0 && !title) {
    return (
      <div className="bg-surface-3 border-border-emphasis h-[537px] w-full max-w-[537px] min-w-0 shrink grow rounded-md border px-34 py-40">
        {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
        <EditGoalTitle goalTitle={goal.studyGoal.title} />
      </div>
    );
  }

  //Todo 리스트만 없을때
  if (goal.studyGoal.mytodoList.length === 0) {
    return (
      <div className="bg-surface-3 border-border-emphasis h-[537px] w-full max-w-[537px] min-w-0 shrink grow rounded-md border px-34 py-40">
        {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
        <EditGoalTitle goalTitle={goal.studyGoal.title} />
        {/*Todo 생성 이동 */}
        {/*Todo href 링크 수정 */}
        <Link
          href="/goal/todo/create"
          className="mt-28 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#454545] bg-[#2c2c2c] p-8 py-36 text-base font-normal text-[#f5f5f5]"
        >
          <NewTodoIcon width={32} height={32} />
          <span className="text-text-primary body-small">
            세부 투두를 추가해 목표를 구체화해보세요.
          </span>
        </Link>
        <div></div>
      </div>
    );
  }

  //Todo 리스트 있을때
  return (
    <div>
      {/* Todo 리스트 있을때 */}
      <div className="bg-surface-3 border-border-emphasis h-[537px] w-full max-w-[537px] min-w-0 shrink grow rounded-md border px-34 py-40">
        <div className="mb-28 flex flex-col gap-8">
          {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
          <EditGoalTitle goalTitle={goal.studyGoal.title} />
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
                <TodoCard key={todo.id} todo={todo} />
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
                <TodoCard key={todo.id} todo={todo} />
              ))}
          </div>
        </div>
        {/*전체 보기 이동 */}
        <NavigateTodo></NavigateTodo>
      </div>
    </div>
  );
}
