import { clientFetch } from '@/shared/api';

export const postCreateStudy = async (): Promise<{ newStudyId: string }> => {
  return clientFetch.post('api/study');
};
