import { http, HttpResponse } from 'msw';

const mockDeleteAccountResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    profileImg: '',
  },
  errorMessage: null,
  fieldErrors: [],
};
export const deleteAccountHandler = [
  http.delete('/api/user', () => {
    return HttpResponse.json(mockDeleteAccountResponse);
  }),
];
