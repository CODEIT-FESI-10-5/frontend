'use client';

import { useStudyGroup } from '@/entities/study/model/useStudyGroup';
import StudyGroup from '@/entities/study/ui/studyGurop';
import { use } from 'react';

export default function StudyGroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ studyId: string }>;
}) {
  // params를 사용하여 studyId를 가져옵니다.
  const { studyId } = use(params);

  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">
          스터디 그룹을 불러오는 중 에러가 발생했습니다:{' '}
          {error instanceof Error ? error.message : '알 수 없는 에러'}
        </div>
      </div>
    );
  }

  if (!studyGroup) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
