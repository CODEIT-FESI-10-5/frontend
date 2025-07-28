import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // '/'와 '/auth' 경로는 검사하지 않음
  if (pathname === '/' || pathname.startsWith('/auth')) {
    return NextResponse.next();
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // API로 로그인 상태 확인
  const res = await fetch(`${apiUrl}/api/auth/check`, {
    method: 'GET',
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
    credentials: 'include',
  });

  // 로그인 상태가 아니면 /auth/login으로 리다이렉트
  if (!res.ok) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // 로그인 상태면 그대로 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정 (API, static 등은 제외)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
