'use client';
import { Button } from '@/shared/ui';
import { useDeleteAccount } from '../model/useDeleteAccount';
import { useModal } from '@/shared/lib/utils/useModal';
import CloseIcon from '@/assets/icon-close.svg';

export default function DeleteAccountButton() {
  const { open, close } = useModal();
  const { mutate: deleteMutation } = useDeleteAccount(() => {
    close();
  });

  const handleClick = () => {
    open(
      <div className="rounded-12 bg-surface-2 border-border-emphasis relative flex h-303 w-325 flex-col items-center justify-center gap-30 border-1 px-24 py-40 md:h-420 md:w-642 md:px-100 md:py-68">
        <CloseIcon
          className="absolute top-30 right-30 h-30 w-30"
          onClick={close}
        />
        <p className="label-small text-text-secondary">
          정말 탈퇴하시겠습니까?
        </p>
        <Button
          label="확인"
          size="xs"
          theme="primary"
          onClick={deleteMutation}
        />
      </div>,
    );
  };

  return (
    <div className="flex w-full items-center justify-center">
      <p
        className="label-small text-highlight cursor-pointer"
        onClick={handleClick}
      >
        회원탈퇴
      </p>
    </div>
  );
}
