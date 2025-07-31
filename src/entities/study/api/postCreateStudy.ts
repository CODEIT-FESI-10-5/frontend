import { clientFetch } from '@/shared/api';
import { CreateStudyResponseApi } from '../model';

export const postCreateStudy = async (): Promise<CreateStudyResponseApi> => {
  return clientFetch.post<CreateStudyResponseApi>('api/study');
};
