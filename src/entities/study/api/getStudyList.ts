import { clientFetch } from '@/shared/api';
import { StudyListResponse } from '../model';

export const getStudyList = async (): Promise<StudyListResponse> => {
  return clientFetch.get('/api/study');
};
