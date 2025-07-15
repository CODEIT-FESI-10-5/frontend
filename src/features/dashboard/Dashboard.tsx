"use client";

import { TodoList, TeamProgress } from "./ui";
import { useDashboard } from "./model";

export default function Dashboard() {
  const groupId = "study-1"; // 핸들러와 일치하도록 수정
  const goalId = "goal-1"; // 핸들러와 일치하도록 수정

  const { data: dashboard, isLoading, error } = useDashboard(groupId, goalId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">대시보드 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">에러 발생: {error instanceof Error ? error.message : "알 수 없는 에러"}</div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">대시보드 데이터를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-start justify-center gap-2">
      <h2 className="text-[#d4d4d4] font-semibold text-xl ml-2">스터디 현황</h2>
      <div className="flex justify-center items-center gap-10">
        <TodoList dashboard={dashboard} />
        <TeamProgress dashboard={dashboard} />
      </div>
    </div>
  );
}
