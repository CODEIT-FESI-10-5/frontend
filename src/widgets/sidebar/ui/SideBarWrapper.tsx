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

  if (isAuthPage)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    );

  return (
    <main className="ml-348 h-full rounded-md p-36">
      <SideBar />
      {children}
    </main>
  );
}
