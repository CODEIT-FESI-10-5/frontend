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
    <div className="rounded-12 bg-surface-2 border-border-emphasis relative flex flex-col gap-62 border-1 md:w-642 md:px-100 md:py-68">
      <CloseIcon
        className="absolute top-30 right-30 h-30 w-30 cursor-pointer"
        onClick={close}
      />
      <div className="flex flex-col gap-12">
        <p className="headline-large text-text-white flex w-full items-start">
          스터디를 삭제합니다.
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-12">
        <Button label="취소" size="lg" theme="emphasis" onClick={close} />
        <Button label="삭제" size="lg" theme="primary" onClick={handleDelete} />
      </div>
    </div>
  );
}
