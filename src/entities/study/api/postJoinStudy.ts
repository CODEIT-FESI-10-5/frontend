import { clientFetch } from '@/shared/api';

export const postJoinStudy = async (
  inviteCode: string,
): Promise<{ studyId: string }> => {
  return clientFetch.post('api/study/join', { inviteCode });
};
