'use client';
import { useRouter } from 'next/navigation';

export default function JoinButton() {
  const router = useRouter();

  return (
    <button
      className="bg-secondary body-large text-text-white rounded-6 h-50 w-143"
      onClick={() => router.push('/')}
    >
      코드로 참여하기
    </button>
  );
}
