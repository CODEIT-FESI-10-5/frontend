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
      <div className="box-border flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    );

  return (
    <main className="flex h-full xl:ml-348 xl:p-36">
      <SideBar />
      {children}
    </main>
  );
}
