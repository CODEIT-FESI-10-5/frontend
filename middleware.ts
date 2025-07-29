import { NextRequest, NextResponse } from 'next/server';

// 검사할 경로 설정
export const config = {
  matcher: ['/dashboard/:path*', '/account'],
};

export function middleware(req: NextRequest) {
  // 쿠키에서 accessToken 읽기
  const token = req.cookies.get('accessToken')?.value;

  if (token) {
    // 로그인 상태이면 /redirect로 이동
    return NextResponse.redirect(new URL('/redirect', req.url));
  } else {
    // 로그인 안됐으면 /auth/login으로 이동
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}
