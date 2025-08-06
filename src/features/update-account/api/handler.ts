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

  http.patch('/api/user/nickname', async () => {
    return HttpResponse.json(mockUpdateNicknameResponse);
  }),

  http.patch('/api/user/profileImg', async () => {
    return HttpResponse.json(mockUpdateProfileResponse);
  }),
];
