import { clientFetch } from '@/shared/api';
import { JoinStudyResponseApi } from '../model';

export const postJoinStudy = async (
  inviteCode: string,
): Promise<{ studyId: string }> => {
  return clientFetch.post<JoinStudyResponseApi>('api/study/join', {
    inviteCode,
  });
};
