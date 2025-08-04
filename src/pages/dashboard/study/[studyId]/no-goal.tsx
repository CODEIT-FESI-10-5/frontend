import NoGoal from '@/widgets/goal/ui/no-goal';

export default function NoGoalPage() {
  return (
    <div className="px-16 py-34 md:px-32 md:py-36">
      <h3 className="m-body-small md:title-medium text-text-secondary mb-15 ml-2 md:ml-12">
        스터디 현황
      </h3>

      <NoGoal />
    </div>
  );
}
