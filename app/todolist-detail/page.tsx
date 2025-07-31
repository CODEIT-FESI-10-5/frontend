import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2>투두 상세 페이지에 접근하기 위해서는 goalId가 필요합니다.</h2>
      <p>Need goalId to request todolist-detail resource</p>
      <Link href="/">홈으로</Link>
    </div>
  );
}
