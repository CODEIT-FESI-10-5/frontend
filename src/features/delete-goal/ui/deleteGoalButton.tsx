import { useModal } from '@/shared/lib/utils/useModal';
import { useDeleteGoalMutation } from '../model';
import DeleteIcon from '@/assets/icon-delete.svg';
import CloseIcon from '@/assets/icon-close.svg';
import { Button } from '@/shared/ui';

export default function DeleteGoalButton({
  goalId,
  studyId,
}: {
  goalId: string;
  studyId: string;
}) {
  const { open } = useModal();

  const handleOpenModal = () => {
    open(<DeleteGoalModal goalId={goalId} studyId={studyId} />);
  };

  return (
    <button
      className="flex cursor-pointer items-center justify-center"
      onClick={handleOpenModal}
    >
      <DeleteIcon width={24} height={24} />
    </button>
  );
}

function DeleteGoalModal({
  goalId,
  studyId,
}: {
  goalId: string;
  studyId: string;
}) {
  const { close } = useModal();
  const { mutate: deleteGoal } = useDeleteGoalMutation(goalId, studyId);

  const handleDelete = () => {
    deleteGoal({ goalId, studyId });
    close();
  };

  return (
    <div className="rounded-12 bg-surface-2 border-border-emphasis relative flex flex-col gap-62 border-1 md:w-642 md:px-100 md:py-68">
      <CloseIcon
        className="absolute top-30 right-30 h-30 w-30 cursor-pointer"
        onClick={close}
      />
      <div className="flex flex-col gap-12">
        <p className="headline-large text-text-white flex w-full items-start">
          스터디 목표를 삭제합니다.
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-12">
        <Button label="취소" size="lg" theme="emphasis" onClick={close} />
        <Button label="삭제" size="lg" theme="primary" onClick={handleDelete} />
      </div>
    </div>
  );
}
