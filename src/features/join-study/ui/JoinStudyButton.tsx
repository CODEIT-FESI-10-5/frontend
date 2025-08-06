'use client';
import { useModal } from '@/shared/lib/utils/useModal';
import JoinStudyModal from './JoinStudyModal';
import { Button } from '@/shared/ui';

export default function JoinStudyButton() {
  const { open } = useModal();

  const handleClick = () => {
    open(<JoinStudyModal />);
  };

  return (
    <Button
      label="코드로 가입하기"
      size="md"
      theme="tertiary"
      type="button"
      className="w-144"
      onClick={handleClick}
    />
  );
}
