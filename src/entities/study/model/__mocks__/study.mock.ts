import { StudyListResponseApi } from '../types';

export const mockStudyListResponseApi: StudyListResponseApi = {
  httpStatusCode: 200,
  errorCode: '',
  errorMessage: '',
  fieldErrors: [],
  data: {
    totalCount: 3,
    recentStudyId: 1,
    studyList: [
      {
        studyId: 1,
        role: 'LEADER',
        title: '프론트엔드 스터디',
        description: 'React와 TypeScript를 학습하는 스터디입니다.',
      },
      {
        studyId: 2,
        role: 'MEMBER',
        title: '알고리즘 스터디',
        description: '매주 백준 5문제씩 풀기',
      },
      {
        studyId: 3,
        role: 'MEMBER',
        title: '운영체제 스터디',
        description: '매주 운영체제 책 2쪽 보기',
      },
    ],
  },
};
