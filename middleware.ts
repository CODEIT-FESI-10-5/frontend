//import { serverFetch } from '@/shared/api';
import { NextRequest, NextResponse } from 'next/server';

interface AuthCheckResponse {
  httpStatusCode: number;
  errorCode: string;
  data: string;
  errorMessage: string;
  fieldErrors: [
    {
      field: string;
      message: string;
    },
  ];
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/note/:path*',
    '/account',
    '/todolist-detail/:path*',
    '/',
  ],
};

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const cookie = req.headers.get('cookie') || '';
  const pathname = req.nextUrl.pathname;
  const isLoginToDashboard = pathname === '/dashboard';
  const isDashboard = pathname.startsWith('/dashboard/') && !isLoginToDashboard;
  const isNote = pathname.startsWith('/note/');
  const isTodo = pathname.startsWith('/todolist-detail/');
  const isAccount = pathname === '/account';
  const isRoot = pathname === '/';

  const needsLoginCheck =
    isDashboard || isNote || isAccount || isRoot || isTodo;

  if (needsLoginCheck) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie,
        },
        cache: 'no-store',
      },
    );
    const loginRes: AuthCheckResponse = await res.json();

    if (loginRes.httpStatusCode !== 200) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
  return NextResponse.next();
}
