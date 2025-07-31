import { clientFetch } from '@/shared/api';
import { JoinStudyResponseApi } from '../model';

export const postJoinStudy = async (
  inviteCode: string,
): Promise<JoinStudyResponseApi> => {
  return clientFetch.post<JoinStudyResponseApi>('api/study/join', {
    inviteCode,
  });
};
