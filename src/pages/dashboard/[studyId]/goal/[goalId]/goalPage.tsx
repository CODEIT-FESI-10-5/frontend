import { use } from 'react';
import Goal from '@/widgets/goal/ui/goal';

interface GoalPageProps {
  params: Promise<{
    studyId: string;
    goalId: string;
  }>;
}

export default function GoalPage({ params }: GoalPageProps) {
  const { studyId, goalId } = use(params);

  return (
    <div className="px-32 py-36">
      <h3 className="title-medium text-text-secondary mb-15 ml-12">
        스터디 현황
      </h3>

      <Goal studyId={studyId} goalId={goalId} />
    </div>
  );
}
