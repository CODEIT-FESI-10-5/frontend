import CreateGoalIcon from '@/assets/create-goal.svg';

export default function NoGoal() {
  return (
    <div className="flex flex-col gap-16 md:flex-row md:gap-27">
      <div className="bg-surface-2 border-border-subtle h-[300px] w-full rounded-lg border md:h-[523px] md:p-34">
        <div className="text-text-secondary flex h-full flex-col items-center justify-center gap-14">
          <CreateGoalIcon className="cursor-pointer" />
          <span>스터디 목표를 추가해 주세요.</span>
        </div>
      </div>
    </div>
  );
}
