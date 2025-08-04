import Study from '@/widgets/study/ui/study';
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

  return (
    <div className="border-border-subtle flex w-full max-w-[1300px] flex-col rounded-md border bg-[#171717]">
      {/* StudyGroup 컴포넌트 (studyId로 데이터 fetch) */}
      <Study studyId={studyId} />

      {/* 페이지 컨텐츠 (goalId로 데이터 fetch) */}
      <div>{children}</div>
    </div>
  );
}
