'use client';
import { useModal } from '@/shared/lib/utils/useModal';
import JoinStudyModal from './JoinStudyModal';

export default function JoinStudyButton() {
  const { open } = useModal();

  const handleClick = () => {
    open(<JoinStudyModal />);
  };

  return (
    <button
      className="bg-secondary title-small text-text-white rounded-6 h-50 w-143"
      onClick={handleClick}
    >
      코드로 가입하기
    </button>
  );
}
