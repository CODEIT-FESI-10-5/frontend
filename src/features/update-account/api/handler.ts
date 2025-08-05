import { http, HttpResponse } from 'msw';

const mockUpdateNicknameResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    nickname: 'testname',
  },
  errorMessage: null,
  fieldErrors: [],
};

const mockUpdatePasswordResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {},
  errorMessage: null,
  fieldErrors: [],
};

const mockUpdateProfileResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    profileImg: '',
  },
  errorMessage: null,
  fieldErrors: [],
};

export const accountHandler = [
  http.patch('/api/user/password', () => {
    return HttpResponse.json(mockUpdatePasswordResponse);
  }),

  http.patch('/api/user/nickname', async ({ request }) => {
    console.log('✅ nickname handler 진입');
    const body = await request.json(); // 꼭 파싱 필요!
    console.log('📦 요청 body:', body);
    return HttpResponse.json(mockUpdateNicknameResponse);
  }),

  http.patch('/api/user/profileImg', async ({ request }) => {
    // FormData 요청인 경우 body 파싱은 생략
    return HttpResponse.json(mockUpdateProfileResponse);
  }),
];
