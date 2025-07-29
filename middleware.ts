import { NextRequest, NextResponse } from 'next/server';

// 검사할 경로 설정
export const config = {
  matcher: ['/dashboard/:path*', '/account'],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    // 로그인 X
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (pathname.startsWith('/dashboard')) {
    // 로그인 상태, dashboard 이동
    return NextResponse.redirect(new URL('/redirect', req.url));
  }

  return NextResponse.next();
}
