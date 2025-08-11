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
  ],
};

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const cookie = req.headers.get('cookie') || '';
  const pathname = req.nextUrl.pathname;
  const isDashboard = pathname.startsWith('/dashboard/');
  const isNote = pathname.startsWith('/note/');
  const isTodo = pathname.startsWith('/todolist-detail/');
  const isAccount = pathname === '/account';
  const isRoot = pathname === '/';

  const needsLoginCheck =
    isDashboard || isNote || isAccount || isTodo || isRoot;

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
      // 가이드 페이지 접속 시 로그인X => 가이드 페이지 보여줌
      if (isRoot) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    // 가이드 페이지 접속 시 로그인O => redirect 페이지로 이동
    if (isRoot) {
      return NextResponse.redirect(new URL('/redirect', req.url));
    }
  }
  return NextResponse.next();
}
