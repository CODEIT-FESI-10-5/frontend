import { http, HttpResponse } from 'msw';
import { mockStudyGroup } from './mocks';

export const studyHandlers = [
  // StudyGroup 조회 API
  http.get('/study-group/:id', ({ params }) => {
    const studyId = params.id as string;
    if (studyId !== mockStudyGroup.id) {
      return HttpResponse.json(
        { error: 'Study group not found' },
        { status: 404 },
      );
    }
    return HttpResponse.json(mockStudyGroup);
  }),

  // StudyGroup 기본 정보 수정 API (제목, 설명)
  http.patch('/studygroup/info/:groupId', async ({ params, request }) => {
    const { groupId } = params;
    if (groupId !== mockStudyGroup.id) {
      return HttpResponse.json(
        { error: 'Study group not found' },
        { status: 404 },
      );
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
      mockStudyGroup.title = body.title;
      mockStudyGroup.description = body.description;
      return HttpResponse.json({
        message: 'Study group info updated successfully',
        studyGroup: {
          id: mockStudyGroup.id,
          title: mockStudyGroup.title,
          description: mockStudyGroup.description,
        },
      });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
  }),

  // StudyGroup 이미지 수정 API
  http.patch('/studygroup/image/:groupId', async ({ params, request }) => {
    const { groupId } = params;
    if (groupId !== mockStudyGroup.id) {
      return HttpResponse.json(
        { error: 'Study group not found' },
        { status: 404 },
      );
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
      mockStudyGroup.image = 'uploaded-image-url-or-data'; // 예시
      return HttpResponse.json({
        message: 'Study group image updated successfully',
        studyGroup: {
          id: mockStudyGroup.id,
          image: mockStudyGroup.image,
        },
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Invalid FormData body' },
        { status: 400 },
      );
    }
  }),
];
