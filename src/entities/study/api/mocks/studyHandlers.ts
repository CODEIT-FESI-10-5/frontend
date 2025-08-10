import { http, HttpResponse } from 'msw';
import { mockStudyGroup } from './mocks';
import { mockStudyListResponseApi } from '../../model/__mocks__/study.mock';

export const studyHandlers = [
  // Study 조회 API
  http.get('/api/study/:studyId', ({ params }) => {
    const studyId = params.studyId as string;
    if (String(studyId) !== String(mockStudyGroup.data.studyId)) {
      return HttpResponse.json({ error: 'Study not found' }, { status: 404 });
    }
    return HttpResponse.json(mockStudyGroup);
  }),

  // Study 기본 정보 수정 API (제목, 설명)
  http.patch('/api/study/:studyId/info', async ({ params, request }) => {
    const { studyId } = params;
    if (String(studyId) !== String(mockStudyGroup.data.studyId)) {
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
  http.patch('/api/study/:studyId/image', async ({ params, request }) => {
    const { studyId } = params;
    if (String(studyId) !== String(mockStudyGroup.data.studyId)) {
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
      const uploadedUrl = 'uploaded-image-url-or-data'; // 예시
      mockStudyGroup.data.studyImageDir = uploadedUrl;
      return HttpResponse.json({
        message: 'Study image updated successfully',
        study: {
          id: mockStudyGroup.data.studyId,
          image: uploadedUrl,
        },
      });
    } catch {
      return HttpResponse.json(
        { error: 'Invalid FormData body' },
        { status: 400 },
      );
    }
  }),
  http.delete('/api/study/:studyId', ({ params }) => {
    const studyId = Number(params.studyId);

    // studyId가 유효하지 않은 경우
    if (!studyId || isNaN(studyId)) {
      return HttpResponse.json(
        {
          httpStatusCode: 400,
          errorCode: 'INVALID_STUDY_ID',
          errorMessage: '유효하지 않은 스터디 ID입니다.',
          fieldErrors: [],
          data: null,
        },
        { status: 400 },
      );
    }

    // 해당 studyId가 존재하지 않는 경우
    const studyExists = mockStudyListResponseApi.data.studyList.some(
      (study) => study.studyId === studyId,
    );

    if (!studyExists) {
      return HttpResponse.json(
        {
          httpStatusCode: 404,
          errorCode: 'STUDY_NOT_FOUND',
          errorMessage: '존재하지 않는 스터디입니다.',
          fieldErrors: [],
          data: null,
        },
        { status: 404 },
      );
    }

    // 스터디 삭제 (실제로는 목 데이터에서 제거)
    const studyIndex = mockStudyListResponseApi.data.studyList.findIndex(
      (study) => study.studyId === studyId,
    );

    if (studyIndex !== -1) {
      mockStudyListResponseApi.data.studyList.splice(studyIndex, 1);
      mockStudyListResponseApi.data.totalCount =
        mockStudyListResponseApi.data.studyList.length;
    }

    // 성공 응답
    return HttpResponse.json(
      {
        httpStatusCode: 200,
        errorCode: '',
        errorMessage: '',
        fieldErrors: [],
        data: {
          message: '스터디가 성공적으로 삭제되었습니다.',
          deletedStudyId: studyId,
        },
      },
      { status: 200 },
    );
  }),
];
