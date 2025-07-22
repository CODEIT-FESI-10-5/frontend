import { http, HttpResponse } from 'msw';
import { loginSchema } from '../model';

export const loginHandler = http.post(
  '/api/auth/login',
  async ({ request }) => {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    if (!email || !password) {
      return HttpResponse.json(
        { message: '이메일과 비밀번호를 입력하세요.' },
        { status: 400 },
      );
    }

    // 더미 유저 정보
    const user = {
      id: 'user-1234',
      email,
      name: 'minhee',
    };

    // localStorage에 user 정보 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return HttpResponse.json(
      {
        message: '로그인 성공',
        user,
      },
      { status: 200 },
    );
  },
);
