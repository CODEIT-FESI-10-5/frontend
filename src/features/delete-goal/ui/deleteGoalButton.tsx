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
    <div className="rounded-12 bg-surface-2 border-border-emphasis relative flex w-518 flex-col gap-16 border-1 md:px-38 md:py-38">
      <div className="flex items-center justify-between">
        <h3 className="headline-large flex w-full text-white">
          스터디 목표 삭제
        </h3>
        <CloseIcon className="h-30 w-30 cursor-pointer" onClick={close} />
      </div>
      <span>생성된 세부 투두와 메모도 모두 삭제됩니다.</span>
      <div className="mt-40 flex w-full items-center justify-end gap-12">
        <Button
          label="취소"
          size="md"
          theme="emphasis"
          onClick={close}
          className="w-166"
        />
        <Button
          label="삭제"
          size="md"
          theme="primary"
          onClick={handleDelete}
          className="w-166"
        />
      </div>
    </div>
  );
}
