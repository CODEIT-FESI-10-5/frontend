"use client";

import { use } from "react";
import { useStudyGroup } from "../../../features/dashboard/model";
import StudyGroup from "../../../features/dashboard/StudyGroup";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    studyId: string;
  }>;
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { studyId } = use(params);

  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">스터디 그룹을 불러오는 중 에러가 발생했습니다: {error instanceof Error ? error.message : "알 수 없는 에러"}</div>
      </div>
    );
  }

  if (!studyGroup) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">스터디 그룹을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#171717]">
      {/* StudyGroup 컴포넌트 (studyId로 데이터 fetch) */}
      <div className="col-span-6">
        <StudyGroup studyId={studyId} />
      </div>

      {/* 페이지 컨텐츠 (goalId로 데이터 fetch) */}
      <div className="col-span-6">{children}</div>
    </div>
  );
}
