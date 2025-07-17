import { StudyListResponse } from '../types';

export const mockStudyList: StudyListResponse = {
  studyList: [
    {
      id: 'study-001',
      title: '프론트엔드 스터디',
      description: 'React와 TypeScript를 학습하는 스터디입니다.',
      isLeader: true,
      studyGoals: ['React Hook 심화 학습', 'Next.js SSR 이해하기'],
    },
    {
      id: 'study-002',
      title: '알고리즘 스터디',
      description: '매주 백준 5문제씩 풀기',
      isLeader: false,
      studyGoals: ['그리디 문제 10개 풀기', 'DP 심화 문제 풀기'],
    },
  ],
};
