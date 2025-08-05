import { http, HttpResponse } from 'msw';

const mockChangeNicknameResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    nickname: 'testname',
  },
  errorMessage: null,
  fieldErrors: [],
};

const mockChangePasswordResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {},
  errorMessage: null,
  fieldErrors: [],
};

const mockChangeProfileResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    profileImg: '',
  },
  errorMessage: null,
  fieldErrors: [],
};

export const changePasswordHandler = [
  http.patch('/api/user/password', () => {
    return HttpResponse.json(mockChangePasswordResponse);
  }),
];

export const changeNicknameHandler = [
  http.patch('/api/user/nickname', ({ request }) => {
    return HttpResponse.json(mockChangeNicknameResponse);
  }),
];

export const changeProfileHandler = [
  http.patch('/api/user/profileImg', ({ request }) => {
    return HttpResponse.json(mockChangeProfileResponse);
  }),
];
