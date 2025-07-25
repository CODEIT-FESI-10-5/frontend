import { StudyListResponse } from '../types';

export const mockStudyList: StudyListResponse = {
  studyList: [
    {
      id: 'study-001',
      title: '프론트엔드 스터디',
      description: 'React와 TypeScript를 학습하는 스터디입니다.',
      isLeader: true,
    },
    {
      id: 'study-002',
      title: '알고리즘 스터디',
      description: '매주 백준 5문제씩 풀기',
      isLeader: false,
    },
    {
      id: 'study-003',
      title: '운영체제 스터디',
      description: '매주 운영체제 책 2쪽 보기',
      isLeader: false,
    },
  ],
};
