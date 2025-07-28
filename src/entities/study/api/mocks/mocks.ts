import { StudyGroupResponse } from '../../model';

export const mockStudyGroup: StudyGroupResponse = {
  httpStatusCode: 200,
  errorCode: '',
  errorMessage: '',
  fieldErrors: [],
  data: {
    role: 'LEADER',
    studyId: 3,
    title: '스터디 제목이 여기에',
    description: '우리는 어떤 스터디를 같이 하는 모입입니다. 열공!',
    createAt: '2025-01-01T00:00:00Z',
    studyImageDir: '/images/study-background.jpg',
    inviteCode: 'A34B5fD',
    teamProgress: 55,
    members: [
      {
        userId: 'member-1',
        name: '닉네임1',
        userImageDir: '/images/study-background.jpg',
      },
      {
        userId: 'member-2',
        name: '닉네임2',
        userImageDir: '/images/study-background.jpg',
      },
      {
        userId: 'member-3',
        name: '닉네임3',
        userImageDir: '/images/study-background.jpg',
      },
      {
        userId: 'member-4',
        name: '닉네임4',
        userImageDir: '/images/study-background.jpg',
      },
      {
        userId: 'member-5',
        name: '닉네임5',
        userImageDir: '/images/study-background.jpg',
      },
      {
        userId: 'member-6',
        name: '닉네임6',
        userImageDir: '/images/study-background.jpg',
      },
    ],
  },
};
