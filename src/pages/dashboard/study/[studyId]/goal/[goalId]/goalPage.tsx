import { use } from 'react';
import Goal from '@/widgets/goal/ui/goal';

interface GoalPageProps {
  params: Promise<{
    studyId: string;
    goalId: string;
  }>;
}

export default function GoalPage({ params }: GoalPageProps) {
  const { goalId } = use(params);

  return (
    <div className="px-16 py-34 md:px-32 md:py-36">
      <h3 className="m-body-small md:title-medium text-text-secondary mb-15 ml-2 md:ml-12">
        스터디 현황
      </h3>
      <Goal goalId={goalId} />
    </div>
  );
}
