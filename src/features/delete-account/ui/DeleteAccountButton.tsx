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
      <div className="rounded-12 bg-surface-2 flex h-193 w-327 flex-col items-end justify-between p-24 md:h-256 md:w-518 md:gap-56 md:p-38">
        <div className="flex w-full flex-col justify-start gap-4">
          <div className="flex w-full justify-between">
            <p className="m-headline-medium md:headline-large text-text-white">
              회원탈퇴
            </p>
            <CloseIcon className="h-30 w-30 cursor-pointer" onClick={close} />
          </div>
          <p className="m-body-small md:body-medium text-text-secondary">
            정말 탈퇴하시겠습니까?
          </p>
        </div>

        <div className="flex w-full justify-between md:justify-end md:gap-16">
          <Button
            label="취소"
            size="md"
            theme="emphasis"
            onClick={close}
            className="w-133 md:w-166"
          />
          <Button
            label="회원탈퇴"
            size="md"
            theme="primary"
            onClick={deleteMutation}
            className="w-133 md:w-166"
          />
        </div>
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
