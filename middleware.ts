import { GoalListResponseApi } from '@/entities/goal';
import { StudyListResponseApi } from '@/entities/study';
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
    // '/dashboard/:path*',
    // '/note/:path*',
    // '/account',
    // '/todolist-detail/:path*',
    // '/',
  ],
};

export async function middleware(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const pathname = req.nextUrl.pathname;
  console.log(cookie);
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
      },
    );
    const loginRes: AuthCheckResponse = await res.json();
    console.log(loginRes);

    if (loginRes.httpStatusCode !== 200) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
  // 로그인 O
  if (isLoginToDashboard) {
    console.log('로그인O');
    const studyRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/study`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie,
        },
      },
    );

    if (!studyRes.ok) {
      // 스터디 안불러지는 경우 에러처리 필요
      return NextResponse.redirect(new URL('/', req.url));
    }

    const studyListRes: StudyListResponseApi = await studyRes.json();
    const studyList = studyListRes.data;

    if (studyListRes.httpStatusCode === 200 && studyList.totalCount !== 0) {
      const goalRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/studies/${studyList.studyList[0].studyId}/goals`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
        },
      );

      if (!goalRes.ok) {
        // 목표 안불러지는 경우 에러처리 필요
        return NextResponse.redirect(new URL('/', req.url));
      }
      const goalListRes: GoalListResponseApi = await goalRes.json();
      const goalList = goalListRes.data;
      if (goalListRes.httpStatusCode === 200 && goalList.totalCount !== 0) {
        // 2. 스터디O, 목표O
        return NextResponse.redirect(
          new URL(
            `/dashboard/study/${studyList.studyList[0].studyId}/goal/${goalList.goals[0].id}`,
            req.url,
          ),
        );
      } else {
        // 2. 스터디O, 목표X
        return NextResponse.redirect(
          new URL(
            `/dashboard/study/${studyList.studyList[0].studyId}`,
            req.url,
          ),
        );
      }
    } else {
      // 3. 스터디X, 목표X
      return NextResponse.redirect(new URL(`/dashboard/study`, req.url));
    }
  }

  return NextResponse.next();
}
