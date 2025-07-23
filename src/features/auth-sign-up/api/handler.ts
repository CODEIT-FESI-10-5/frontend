import { http, HttpResponse } from 'msw';
import { signUpSchema } from '../model';

export const signUpHandler = [
  http.post('/api/auth/sign-up', async ({ request }) => {
    const body = await request.json();
    const result = await signUpSchema.safeParse(body);

    if (!result.success) {
      return HttpResponse.json(
        { message: '유효성 검사 실패', issues: result.error.issues },
        { status: 400 },
      );
    }

    const { email, name } = result.data;

    // 더미 유저 정보
    const user = {
      id: 'user-1234',
      email,
      name,
    };

    return HttpResponse.json(
      {
        message: '회원가입 성공',
        user,
      },
      { status: 200 },
    );
  }),
];
