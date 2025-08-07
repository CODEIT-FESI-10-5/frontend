import { cn } from '@/shared/lib/utils/cn';
import { useModal } from '@/shared/lib/utils/useModal';
import { useDeleteStudyMutation } from '../model';
import CloseIcon from '@/assets/icon-close.svg';
import { Button } from '@/shared/ui';

export default function DeleteStudyButton({ studyId }: { studyId: string }) {
  const { open } = useModal();

  const handleOpenModal = () => {
    open(<DeleteStudyModal studyId={studyId} />);
  };

  return (
    <button
      className={cn(
        'text-highlight cursor-pointer px-30 py-14',
        'm-body-large',
        'body-medium',
      )}
      onClick={handleOpenModal}
    >
      스터디 삭제
    </button>
  );
}

function DeleteStudyModal({ studyId }: { studyId: string }) {
  const { close } = useModal();
  const { mutate: deleteStudy } = useDeleteStudyMutation(studyId);

  const handleDelete = () => {
    deleteStudy({ studyId });
    close();
  };

  return (
    <div className="rounded-12 bg-surface-2 border-border-emphasis relative flex w-518 flex-col gap-16 border-1 md:px-38 md:py-38">
      <div className="flex items-center justify-between">
        <h3 className="headline-large flex w-full text-white">스터디 삭제</h3>
        <CloseIcon className="h-30 w-30 cursor-pointer" onClick={close} />
      </div>
      <span>스터디에 포함된 모든 목표, 투두, 메모가 삭제됩니다.</span>
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
