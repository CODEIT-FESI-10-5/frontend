import { http, HttpResponse } from 'msw';
import { loginSchema } from '../model';

export const loginHandler = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return HttpResponse.json(
        { message: '유효성 검사 실패', issues: result.error.issues },
        { status: 400 },
      );
    }

    const mockProfile = {
      email: 'test@example.com',
      nickname: '정민희',
      profileImage: '',
    };

    // localStorage에 user 정보 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(mockProfile));
    }

    return HttpResponse.json(
      {
        message: '로그인 성공',
        data: mockProfile,
      },
      { status: 200 },
    );
  }),
];
