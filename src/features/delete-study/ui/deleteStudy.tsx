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
  const { mutate: deleteStudy, isPending } = useDeleteStudyMutation(studyId);

  const handleDelete = () => {
    deleteStudy({ studyId });
    close();
  };

  return (
    <div className="rounded-12 bg-surface-2 border-border-emphasis relative flex w-full max-w-518 flex-col gap-16 border-1 px-20 py-24 md:px-38 md:py-38">
      <div className="flex items-center justify-between">
        <h3 className="headline-large flex w-full text-lg text-white md:text-xl">
          스터디 삭제
        </h3>
        <CloseIcon
          className="h-24 w-24 cursor-pointer md:h-30 md:w-30"
          onClick={close}
        />
      </div>
      <span className="text-sm text-gray-300 md:text-base">
        스터디에 포함된 모든 목표, 투두, 메모가 삭제됩니다.
      </span>
      <div className="mt-20 flex w-full items-center justify-end gap-8 md:mt-40 md:gap-12">
        <Button
          label="취소"
          size="md"
          theme="emphasis"
          onClick={close}
          className="w-full max-w-166 md:w-166"
        />
        <Button
          label="삭제"
          size="md"
          theme="primary"
          onClick={handleDelete}
          className="w-full max-w-166 md:w-166"
          isPending={isPending}
        />
      </div>
    </div>
  );
}
