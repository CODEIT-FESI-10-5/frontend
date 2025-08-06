import { http, HttpResponse } from 'msw';

const mockCreateStudyResponse = {
  httpStatusCode: 200,
  errorCode: null,
  data: {
    studyId: 3,
  },
  errorMessage: null,
  fieldErrors: [],
};
export const sidebarCreateStudyHandler = [
  http.post('/api/study', () => {
    return HttpResponse.json(mockCreateStudyResponse);
  }),
];
