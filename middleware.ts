import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/dashboard/:path*', '/account'],
};

export async function middleware(req: NextRequest) {
  //   const pathname = req.nextUrl.pathname;
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`, {
  //     method: 'GET',
  //     headers: {
  //       Cookie: req.headers.get('cookie') || '',
  //     },
  //     credentials: 'include',
  //   });
  //   if (!res.ok) {
  //     // 로그인 X
  //     return NextResponse.redirect(new URL('/auth/login', req.url));
  //   }
  //   if (pathname.startsWith('/dashboard')) {
  //     // 로그인 상태, dashboard 이동
  //     return NextResponse.redirect(new URL('/redirect', req.url));
  //   }
  //   return NextResponse.next();
}
