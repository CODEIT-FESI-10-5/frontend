import { http, HttpResponse } from 'msw';
const mockLogoutResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    profileImg: '',
  },
  errorMessage: null,
  fieldErrors: [],
};
export const logoutHandler = [
  http.post('/api/user/logout', () => {
    return HttpResponse.json(mockLogoutResponse);
  }),
];
