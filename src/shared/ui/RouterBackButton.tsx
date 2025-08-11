'use client';
import { useRouter } from 'next/navigation';

export default function RouterBackButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); // 이전 페이지가 없을 때 이동할 안전한 페이지
    }
  };

  return (
    <div className="w-fit cursor-pointer" onClick={handleClick}>
      {children}
    </div>
  );
}
