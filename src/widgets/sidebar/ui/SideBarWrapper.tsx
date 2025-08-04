'use client';

import { usePathname } from 'next/navigation';
import SideBar from './SideBar';

export default function SideBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === '/auth/login' ||
    pathname === '/auth/sign-up' ||
    pathname === '/';

  // 404 페이지인지 확인 (존재하지 않는 경로)
  const validPaths = [
    '/',
    '/auth/login',
    '/auth/sign-up',
    '/dashboard',
    '/dashboard/study',
    '/note',
    '/profile',
    '/todo',
    '/todolist-detail',
    '/account',
  ];

  // 동적 경로 패턴들
  const validDynamicPatterns = [
    /^\/dashboard\/study\/[^/]+\/goal\/[^/]+$/, // /dashboard/study/[studyId]/goal/[goalId]
    /^\/note\/edit\/[^/]+$/, // /note/edit/[noteId]
    /^\/todolist-detail\/[^/]+$/, // /todolist-detail/[goalId]
  ];

  const isNotFoundPage =
    pathname &&
    !validPaths.includes(pathname) &&
    !validDynamicPatterns.some((pattern) => pattern.test(pathname));

  if (isAuthPage || isNotFoundPage)
    return (
      <div className="box-border flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    );

  return (
    <main className="flex h-full w-screen xl:ml-348 xl:p-36">
      <SideBar />
      {children}
    </main>
  );
}
