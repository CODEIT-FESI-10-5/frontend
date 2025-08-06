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
    /^\/dashboard\/study\/[^/]+$/, // /dashboard/study/[studyId]
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
      <main className="box-border flex h-screen w-dvw items-center justify-center">
        {children}
      </main>
    );

  return (
    <main className="flex h-full max-w-screen">
      <SideBar />
      <div className="w-full flex-1 xl:p-36">{children}</div>
    </main>
  );
}
