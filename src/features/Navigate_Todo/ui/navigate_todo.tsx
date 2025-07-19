import Link from 'next/link';

//노트 여부에 따라 2가지 아이콘 + 더보기 아이콘
export default function NavigateTodo() {
  return (
    <Link href="/goal/todolist">
      <span className="text-text-secondary body-medium mt-28 flex items-center justify-center">
        전체 보기
      </span>
    </Link>
  );
}
