import { clientFetch } from '@/shared/api';

export const deleteStudy = async (studyId: string) => {
  const parsedResponse = await clientFetch.delete(`/api/study/${studyId}`);

  return parsedResponse;
};
