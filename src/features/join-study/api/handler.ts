import { http, HttpResponse } from 'msw';
import { JoinStudySchema } from '../model';

export const sidebarJoinStudyHandler = [
  http.post('/api/study/join', async ({ request }) => {
    const body = (await request.json()) as JoinStudySchema;
    console.log('Request body:', body);
    const inviteCode = body.inviteCode;

    const studyId = inviteCode === '12345678' ? 'study-005' : 'invalid';

    if (studyId === 'invalid') {
      return HttpResponse.json(
        {
          errorCode: 'INVALID_CODE',
          errorMessage: '유효하지 않은 초대코드입니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({ studyId: studyId });
  }),
];
