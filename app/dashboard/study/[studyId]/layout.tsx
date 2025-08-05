import StudyGroupLayout from '@/pages/dashboard/study/[studyId]/studyLayout';

interface StudyGroupLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    studyId: string;
  }>;
}

export default function StudyGroup({
  children,
  params,
}: StudyGroupLayoutProps) {
  return (
    <>
      <StudyGroupLayout params={params}>{children}</StudyGroupLayout>
    </>
  );
}
