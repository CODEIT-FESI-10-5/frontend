"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { updateGoalTitle } from "../api";
import Link from "next/link";
import { Goal } from "../model";
import TodoCard from "@/entities/todo/ui/todoCard";

/**
 * mytodoList의 completed 상태를 기반으로 진행도를 계산
 */
function calculateProgress(mytodoList: { completed: boolean }[]) {
  const totalTodos = mytodoList.length;
  const completedTodos = mytodoList.filter((todo) => todo.completed).length;
  return totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
}

export default function GoalCard({ goal }: { goal: Goal }) {
  const [title, setTitle] = useState(goal.studyGoal.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const progress = calculateProgress(goal.studyGoal.mytodoList);

  // debounced API 호출 함수
  const debouncedUpdateTitle = (newTitle: string) => {
    // 이전 타이머가 있다면 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새로운 타이머 설정 (1.5초 후 API 호출)
    timeoutRef.current = setTimeout(async () => {
      if (newTitle !== goal.studyGoal.title && newTitle.trim() !== "") {
        try {
          setIsUpdating(true);
          await updateGoalTitle("study-1", "goal-1", newTitle);
          console.log("제목이 성공적으로 업데이트되었습니다:", newTitle);
        } catch (error) {
          console.error("제목 업데이트 실패:", error);
          // 실패 시 원래 제목으로 되돌리기
          setTitle(goal.studyGoal.title);
        } finally {
          setIsUpdating(false);
        }
      }
    }, 2000); // 2초 debounce
  };

  // input 변경 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdateTitle(newTitle);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  //Todo 리스트가 없고 제목도 없을때
  if (goal.studyGoal.mytodoList.length === 0 && !title) {
    return (
      <div className="w-full h-[540px] max-w-[534px] min-w-0 grow shrink p-6 rounded-md bg-[#353535]">
        {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
        <div className="relative">
          <input type="text" className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none" value={title} onChange={handleTitleChange} placeholder="스터디 목표를 입력..." />
          {/* 업데이트 상태 표시 */}
          {isUpdating && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="text-xs text-[#ff6b35]">저장 중...</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  //Todo 리스트만 없을때
  if (goal.studyGoal.mytodoList.length === 0) {
    return (
      <div className="w-full h-[540px] max-w-[534px] min-w-0 grow shrink p-6 rounded-md bg-[#353535]">
        {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
        <div className="relative">
          <input type="text" className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none" value={title} onChange={handleTitleChange} placeholder="스터디 목표를 입력..." />
          {/* 업데이트 상태 표시 */}
          {isUpdating && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="text-xs text-[#ff6b35]">저장 중...</div>
            </div>
          )}
        </div>
        {/*Todo 생성 이동 */}
        {/*Todo href 링크 수정 */}
        <Link href="/goal/todo/create" className="mt-4 font-normal text-base flex text-[#f5f5f5] flex-col items-center justify-center gap-3 bg-[#2c2c2c] p-8 rounded-xl border-2 border-dashed border-[#454545]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 22.3333H17V17H22.3334V15H17V9.66667H15V15H9.66671V17H15V22.3333ZM16.0024 28.6667C14.2504 28.6667 12.6036 28.3342 11.062 27.6693C9.52048 27.0044 8.1796 26.1021 7.03937 24.9623C5.89915 23.8226 4.99637 22.4822 4.33104 20.9413C3.66593 19.4004 3.33337 17.7541 3.33337 16.0023C3.33337 14.2503 3.66582 12.6036 4.33071 11.062C4.9956 9.52045 5.89793 8.17956 7.03771 7.03934C8.17749 5.89911 9.51782 4.99634 11.0587 4.331C12.5996 3.66589 14.2459 3.33334 15.9977 3.33334C17.7497 3.33334 19.3965 3.66578 20.938 4.33067C22.4796 4.99556 23.8205 5.89789 24.9607 7.03767C26.1009 8.17745 27.0037 9.51778 27.669 11.0587C28.3342 12.5996 28.6667 14.2459 28.6667 15.9977C28.6667 17.7497 28.3343 19.3964 27.6694 20.938C27.0045 22.4796 26.1022 23.8204 24.9624 24.9607C23.8226 26.1009 22.4823 27.0037 20.9414 27.669C19.4005 28.3341 17.7542 28.6667 16.0024 28.6667ZM16 26.6667C18.9778 26.6667 21.5 25.6333 23.5667 23.5667C25.6334 21.5 26.6667 18.9778 26.6667 16C26.6667 13.0222 25.6334 10.5 23.5667 8.43334C21.5 6.36667 18.9778 5.33334 16 5.33334C13.0223 5.33334 10.5 6.36667 8.43337 8.43334C6.36671 10.5 5.33337 13.0222 5.33337 16C5.33337 18.9778 6.36671 21.5 8.43337 23.5667C10.5 25.6333 13.0223 26.6667 16 26.6667Z"
              fill="#F5F5F5"
            />
          </svg>
          <span>세부 투두를 추가해 목표를 구체화해보세요.</span>
        </Link>
        <div></div>
      </div>
    );
  }

  //Todo 리스트 있을때
  return (
    <div>
      {/* Todo 리스트 있을때 */}
      <div className="p-6 rounded-md bg-[#353535]">
        {/* 스터디 목표 제목 수정 가능하게 input으로 구현 */}
        <div className="relative">
          <input type="text" className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none" value={title} onChange={handleTitleChange} placeholder="스터디 목표를 입력..." />
          {/* 업데이트 상태 표시 */}
          {isUpdating && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="text-xs text-[#ff6b35]">저장 중...</div>
            </div>
          )}
        </div>
        {/* Progress 바 */}
        <div className="relative mt-4">
          {/* Progress 바와 텍스트를 포함하는 컨테이너 */}
          <div className="relative bg-[#4a4a4a] rounded-full h-7 overflow-hidden">
            {/* Animated Progress Fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: "easeOut",
              }}
            />

            {/* 왼쪽 텍스트 (날짜/시작시간) */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm font-semibold">{goal.studyGoal.completedCt} 완료</div>

            {/* 오른쪽 텍스트 (진행도) */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm font-semibold">{Math.round(progress)}%</div>
          </div>
        </div>
        {/* Todo List 리스트 항목 추가 */}
        <div className="flex flex-col gap-10 mt-10">
          {/*최근 완료된 투두 */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg text-white">최근 완료된 투두</span>
            {/* 가장 최근 완료된 투두를 정렬 후 todo 컴포넌트 넣음 */}
            {goal.studyGoal.mytodoList
              .filter((todo) => todo.completed)
              .sort((a, b) => (b.completedAt ? new Date(b.completedAt).getTime() : 0) - (a.completedAt ? new Date(a.completedAt).getTime() : 0))
              .slice(0, 1)
              .map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            {/* <Todo todo={goal.studyGoal.mytodoList[0]}></Todo> */}
          </div>
          {/*진행중인 투두 */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg text-white">진행중인 투두</span>
            {/* order 순서가 가장 높은(숫자가 낮음) 투두*/}
            {goal.studyGoal.mytodoList
              .filter((todo) => todo.completed === false)
              .sort((a, b) => a.order - b.order)
              .slice(0, 1)
              .map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            {/* <Todo todo={goal.studyGoal.mytodoList[1]}></Todo> */}
          </div>
        </div>
        {/*전체 보기 이동 */}
        <div className="bg-[#171717] rounded-md px-4 py-2 mt-6 text-center">
          <Link href="/goal/todolist">
            <span className="text-white font-semibold">전체 보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}