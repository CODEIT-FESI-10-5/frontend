import StudyGroupLayout from '@/(pages)/dashboard/[studyId]/StudyGroupLayout';

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
      <StudyGroupLayout children={children} params={params} />
    </>
  );
}
