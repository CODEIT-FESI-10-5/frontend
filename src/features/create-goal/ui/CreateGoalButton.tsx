'use client';
import CreateGoalIcon from '@/assets/create-goal.svg';
import { useCreateGoal } from '../model';

interface CreateGoalButtonProps {
  studyId: number;
}

export default function CreateGoalButton({ studyId }: CreateGoalButtonProps) {
  const mutation = useCreateGoal(studyId);

  return (
    <button
      onClick={() => {
        mutation.mutate({
          title: '스터디 목표를 입력해주세요.',
          studyId: studyId,
        });
      }}
      className="cursor-pointer"
    >
      <CreateGoalIcon />
    </button>
  );
}
