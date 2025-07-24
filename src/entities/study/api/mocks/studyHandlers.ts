import { http, HttpResponse } from 'msw';
import { mockStudyGroup } from './mocks';

export const studyHandlers = [
  // Study 조회 API
  http.get('/study/:studyId', ({ params }) => {
    const studyId = params.studyId as string;
    if (studyId !== mockStudyGroup.data.studyId) {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 });
    }
    return HttpResponse.json(mockStudyGroup);
  }),

  // Study 기본 정보 수정 API (제목, 설명)
  http.patch('/study/:studyId/info', async ({ params, request }) => {
    const { studyId } = params;
    if (studyId !== mockStudyGroup.data.studyId) {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 });
    }
    try {
      const body = (await request.json()) as {
        title: string;
        description: string;
      };
      if (!body.title || !body.description) {
        return HttpResponse.json(
          { error: 'Title and description are required' },
          { status: 400 },
        );
      }
      mockStudyGroup.data.title = body.title;
      mockStudyGroup.data.description = body.description;
      return HttpResponse.json({
        message: 'Study info updated successfully',
        study: {
          id: mockStudyGroup.data.studyId,
          title: mockStudyGroup.data.title,
          description: mockStudyGroup.data.description,
        },
      });
    } catch {
      return HttpResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
  }),

  // Study 이미지 수정 API
  http.patch('/study/:studyId/image', async ({ params, request }) => {
    const { studyId } = params;
    if (studyId !== mockStudyGroup.data.studyId) {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 });
    }
    try {
      const formData = await request.formData();
      const imageFile = formData.get('image');
      if (!imageFile) {
        return HttpResponse.json(
          { error: 'Image is required' },
          { status: 400 },
        );
      }
      // 실제 서비스에서는 파일 저장/URL 반환 등 처리 필요
      mockStudyGroup.data.studyImageDir = 'uploaded-image-url-or-data'; // 예시
      return HttpResponse.json({
        message: 'Study image updated successfully',
        study: {
          id: mockStudyGroup.data.studyId,
          image: mockStudyGroup.data.studyImageDir,
        },
      });
    } catch {
      return HttpResponse.json(
        { error: 'Invalid FormData body' },
        { status: 400 },
      );
    }
  }),
];
