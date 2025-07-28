import { clientFetch } from '@/shared/api';
import { StudyListResponseApi } from '../model';

export const getStudyList = async (): Promise<StudyListResponseApi> => {
  return clientFetch.get('/api/study');
};
