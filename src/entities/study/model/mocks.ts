import type { StudyGroup } from './types';

export const mockStudyGroup: StudyGroup = {
  id: 'study-1',
  title: '스터디 제목이 여기에',
  description: '우리는 어떤 스터디를 같이 하는 모입입니다. 열공!',
  createdAt: new Date('2025-01-01T00:00:00Z'),
  image: '/images/study-background.jpg',
  teamProgress: 55,
  inviteLink: 'A34B5fD',
  members: [
    { id: 'member-1', name: '닉네임1', image: '/images/study-background.jpg' },
    { id: 'member-2', name: '닉네임2', image: '/images/study-background.jpg' },
    { id: 'member-3', name: '닉네임3', image: '/images/study-background.jpg' },
    { id: 'member-4', name: '닉네임4', image: '/images/study-background.jpg' },
    { id: 'member-5', name: '닉네임5', image: '/images/study-background.jpg' },
    { id: 'member-6', name: '닉네임6', image: '/images/study-background.jpg' },
  ],
};
