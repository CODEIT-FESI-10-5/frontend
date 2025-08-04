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
  const isNotFoundPage =
    pathname &&
    !pathname.match(
      /^\/($|auth\/|dashboard|note|profile|todo|todolist-detail)/,
    );

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
