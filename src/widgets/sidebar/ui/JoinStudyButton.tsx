'use client';
import { useRouter } from 'next/navigation';

export default function JoinStudyButton() {
  const router = useRouter();

  //코드 입력 창 처리
  return (
    <button
      className="bg-secondary title-small text-text-white rounded-6 h-50 w-143"
      onClick={() => router.push('/')}
    >
      코드로 가입하기
    </button>
  );
}
